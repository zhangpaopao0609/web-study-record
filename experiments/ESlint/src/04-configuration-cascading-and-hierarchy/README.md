1. 层叠配置将使用离要检测的文件最近的 `.eslintrc` 文件作为最高优先级，然后才是父目录中的配置文件。

2. 如果同一目录下 `package.json` 和 `eslintrc` 同时存在，`.eslintrc` 优先级高会被使用，`package.json`文件将不会被使用。

3. 默认情况下，ESLint 会在所有父级目录里面寻找配置文件，一直到根目录。为了将 ESLint 限制到一个特定的项目，在你的项目根目录下的 `package.json` 文件或者 `.eslintrc` 文件里的 `eslintConfig` 字段下设置 `"root": true`。ESLint 一旦发现配置文件中有 `"root": true`，它就会停止在父级目录中寻找。