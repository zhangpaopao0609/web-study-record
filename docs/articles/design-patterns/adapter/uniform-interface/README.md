# 统一对外接口
有两个提供登陆的三方服务 —— Firebase 和 Supabase，分别提供了五种能力，

- 邮箱注册
  - Firebase ——  createUserWithEmailAndPassword
  - Supabase —— signUp
- 邮箱验证
  - Firebase ——  sendEmailVerification
  - Supabase —— emailForVerification
- 邮箱登陆
  - Firebase ——  signInWithEmailAndPassword
  - Supabase —— signIn
- 密码重置
  - Firebase ——  sendPasswordResetEmail
  - Supabase —— resetPasswordForEmail
- 用户登出
  - Firebase ——  signOut
  - Supabase —— signOut

当在项目中使用时，如果没有做逻辑的统一，那么代码中一定会出现大量的判断逻辑，用以实现用户在选择使用不同的服务时底层正确的使用对应的接口，诸如以下代码：

```ts
// 用户注册逻辑
if(用户选择的服务 == Firebase) {
  createUserWithEmailAndPassword(...)
} else {
  registerByEmail(...)         
}

// 用户登陆逻辑
if(用户选择的服务 == Firebase) {
  signInWithEmailAndPassword(...)
} else {
  loginByEmail(...)         
}
```

这仅仅只是接口层面的不同和所需的逻辑处理，除此之外，不同的服务提供的接口还存在以下差异：

- 所需要的参数格式不尽相同
- 所返回的响应体格式不尽相同
- 异常错误的捕获格式不尽相同

如果没有进行统一的处理，这些差异都会直接体现在业务逻辑中，并且伴随着所选服务的判断，诸如以下代码：

```js
// 用户注册逻辑
if(用户选择的服务 == Firebase) {
  formatFirebaseParams() // 格式化注册参数，不同的服务所需参数格式不同
  try {
    response = createUserWithEmailAndPassword(...)	// Firebase 注册逻辑
    user = formatFirebaseResponse(response) // 格式化返回体，不同的服务返回体格式不同         
  } catch (e) { // 处理异常，不同的服务捕获的异常错误格式不同
    if(e.code === '邮箱已存在') {
      throw '邮箱已存在' 
    } else if(){} ....
    ...
  }
  
} else {
  formatSupabaseParams() // 格式化注册参数
  try {
    response = registerByEmail(...)	// Supabase 注册逻辑
    user = formatSupabaseResponse(response) // 格式化返回体          
  } catch (e) { // 处理异常
    if(e.code === 1001) {
      throw '邮箱已存在' 
    } else if(){} ....
    ...
  }     
}
```

从上可以看到，在没有统一处理的情况下，这些逻辑直接杂糅在业务中显得十分的混乱，并且，可以预见的是，随着提供登陆的三方服务的增加，这里的逻辑将相应的增加，这将给开发带来了巨大的成本：

- 只要新增一种服务类型，每一个使用服务的地方都需要增加相应逻辑
- 只要新增一处使用，需要把所有服务对应的逻辑都添加上

有没有一种办法可以解决这个问题呢？能够实现以下特性：

1. 统一使用时的接口

   不论用户选择的是 Firebase 还是 Supabase，代码中调用的是统一的接口，如 createUser(email, password)，不再区分服务

2. 统一返回体格式

   不论用户选择的是 Firebase 还是 Supabase，业务代码中使用时返回的响应体结构一致

3. 统一异常捕获格式

   不论用户选择的是 Firebase 还是 Supabase，针对同一种类型的错误，捕获时返回的错误一致

那一定是有的，下面我们一步一步揭开这神秘的面纱

1. 统一的接口

   利用抽象类统一对外暴露的接口

   ```ts
   export default abstract class AuthBase {
     abstract initialize(): void;
     abstract get currentUser(): User;
     abstract createUser(email: string, password: string): Promise<User>;
     abstract emailVerification(): Promise<void>;
     abstract loginIn(email: string, password: string): Promise<User>;
     abstract logOut(): Promise<void>;
     abstract passwordReset(email: string): Promise<void>;
   }
   ```

   那么，只要我们对外的服务是实现了这个类，那么自然接口都是一致的了

2. 三方服务实现这个类

   ```ts
   import { createUserWithEmailAndPassword } from "firebase/auth";
   import {
     WeakPasswordAuthException,
     EmailAlreadyInUseAuthException,
     InvalidEmailAuthException,
     GenericAuthException,
   } from "../auth_exceptions";
   
   export default class FirebaseAuthProvider implements AuthBase {
     auth: Auth;
   
     initialize(): void {
      ...
     }
   
     get currentUser(): User {
      ...
     }
   
     async createUser(email: string, password: string): Promise<User> {
       try {
         const { user } = await createUserWithEmailAndPassword(
           this.auth,
           email,
           password
         );
         return {
           id: user.uid,
           email: user.email!,
           isEmailVerified: user.emailVerified,
         };
       } catch (e) {
         switch (e.code) {
           case "email-already-in-use":
             throw new EmailAlreadyInUseAuthException();
           case "weak-password":
             throw new WeakPasswordAuthException();
           case "invalid-email":
             throw new InvalidEmailAuthException();
           default:
             throw new GenericAuthException();
         }
       }
     }
   
     async emailVerification(): Promise<void> {
       ...
     }
   
     async loginIn(email: string, password: string): Promise<User> {
     	...
     }
   
     async logOut(): Promise<void> {
       ...
     }
   
     async passwordReset(email: string): Promise<void> {
       ...
     }
   }
   
   ```

   ```ts
   import { User } from "../types";
   import AuthBase from "../auth_base";
   import { createClient, SupabaseClient, AuthUser } from "@supabase/supabase-js";
   import {
     WeakPasswordAuthException,
     EmailAlreadyInUseAuthException,
     InvalidEmailAuthException,
     GenericAuthException,
   } from "../auth_exceptions";
   
   export default class SupabaseAuthProvider implements AuthBase {
     supabase: SupabaseClient;
   
     initialize(): void {
       ...
     }
   
     get currentUser(): User {
      	...
     }
   
     async createUser(email: string, password: string): Promise<User> {
       try {
         const { user, error } = await this.supabase.auth.signIn({
           email,
           password,
         });
         if (user !== null) {
           return {
             id: user?.id,
             email: user.email!,
             isEmailVerified: !!user.new_email,
           };
         } else {
           const status = error?.status;
           switch (status) {
             case 1001:
               throw new EmailAlreadyInUseAuthException();
             case 1002:
               throw new WeakPasswordAuthException();
             case 1003:
               throw new InvalidEmailAuthException();
             default:
               throw new GenericAuthException();
           }
         }
       } catch (e) {
         throw new GenericAuthException();
       }
     }
   
     async emailVerification(): Promise<void> {
       ...
     }
   
     async loginIn(email: string, password: string): Promise<User> {
       ...
     }
   
     async logOut(): Promise<void> {
       ...
     }
   
     async passwordReset(email: string): Promise<void> {
       ...
     }
   }
   
   ```

   在这里，我们就实现了

   - 统一服务对外提供给的  api

   - 统一返回体格式
   - 统一错误捕获

3. 多服务的聚合

   ```ts
   import { User } from "./types";
   import AuthBase from "./auth_base";
   import FirebaseAuthProvider from "./provider/firebase_auth_provider";
   import SupabaseAuthProvider from "./provider/supabase_auth_provider";
   
   const providerMap = {
     firebase: new FirebaseAuthProvider(),	
     supabase: new SupabaseAuthProvider(),
   } as const;
   
   export type ProviderEnum = keyof typeof providerMap;
   
   export default class AuthService implements AuthBase {
     constructor(private provider: AuthBase) {}
   
     static instance(provider: ProviderEnum) {
       return new AuthService(providerMap[provider]);
     }
   
     initialize(): void {
       this.provider.initialize();
     }
   
     get currentUser(): User {
       return this.provider.currentUser;
     }
   
     createUser(email: string, password: string): Promise<User> {
       return this.provider.createUser(email, password);
     }
   
     emailVerification(): Promise<void> {
       return this.provider.emailVerification();
     }
   
     loginIn(email: string, password: string): Promise<User> {
       return this.provider.loginIn(email, password);
     }
   
     logOut(): Promise<void> {
       return this.provider.logOut();
     }
   
     passwordReset(email: string): Promise<void> {
       return this.provider.passwordReset(email);
     }
   }
   ```

4. 使用

   ```ts
   import AuthService from "./auth/auth_service";
   import {
     WeakPasswordAuthException,
     EmailAlreadyInUseAuthException,
     InvalidEmailAuthException,
   } from "./auth/auth_exceptions";
   
   // 当用户选择使用某种三方服务时，只需要在这里进行对应实例化即可，后续的所有接口都是一致的，不需要做任何的判断
   const provider = AuthService.instance("firebase");
   // 无论使用何种服务，使用时这里都一致的接口、参数、响应体和错误响应
   async function handleRegister(email: string, password: string) {
     try {
       const user = await provider.createUser(email, password);
       // user 格式统一
     } catch (e) {
       if (e instanceof EmailAlreadyInUseAuthException) {
         // 抛出对应的错误信息
       } else if (e instanceof WeakPasswordAuthException) {
         // 抛出对应的错误信息
       } else if (e instanceof InvalidEmailAuthException) {
         // 抛出对应的错误信息
       } else {
         // 抛出对应的错误信息
       }
     }
   }
   ```

   

   <div align='center'>  <img src="./img/select-provider.png" /></div>

