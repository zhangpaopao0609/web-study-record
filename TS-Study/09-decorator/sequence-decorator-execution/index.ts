/**
 * 装饰器执行的顺序
 * Sequence of decorator execution
 */


function propertyDecorator_1(target: any, propertyName: any) {
  console.log("1. propertyDecorator_1");
};
function propertyDecorator_2(target: any, propertyName: any) {
  console.log("1. propertyDecorator_2");
};

function functionDecorator_1(target: any, functionName: any, descriptor: any) {
  console.log("2. functionDecorator_1");
};
function functionDecorator_2(target: any, functionName: any, descriptor: any) {
  console.log("2. functionDecorator_2");
};

function functionParamsDecorator_1(target: any, functionName: any, paramsIndex: number) {
  console.log("3. functionParamsDecorator_1");
};
function functionParamsDecorator_2(target: any, functionName: any, paramsIndex: number) {
  console.log("3. functionParamsDecorator_2");
};

function classDecorator_1(target: any) {
  console.log("4. classDecorator_1");
};
function classDecorator_2(target: any) {
  console.log("4. classDecorator_2");
};

@classDecorator_1
@classDecorator_2
class Arrow {
  @propertyDecorator_1
  @propertyDecorator_2
  name: string | undefined;

  @functionDecorator_1
  @functionDecorator_2
  getName() {}


  set(@functionParamsDecorator_1 name: string, @functionParamsDecorator_2 age: string) {}
};

export {}