// 赋值
let value: string | number;
value = 'hello';
if(typeof value === 'string') {
    console.log(value.toUpperCase());
}

value = 42;
if(typeof value === 'number') {
    console.log(value.toFixed(2));
}

// 控制流分析  --在条件表达式中最多分析五个间接级别--
const f1 = (x: unknown) => {
    const isString = typeof x === 'string';
    if(isString) {
        x.length;
    }
}

const f2 = (
    obj: { kind: 'foo'; foo: string} | { kind: 'bar'; bar:number}
) => {
    const isFoo = obj.kind === 'foo';
    if(isFoo) {
        obj.foo
    } else {
        obj.bar;
    }
}

const f3 = (x: unknown) => {
    let isString = typeof x === 'string';
    if(isString) {
        x.length // isString不是常量
    }
}

const f4 = (
    obj: { kind: 'foo'; foo: string} | { kind: 'bar'; bar: number}
) => {
    const isFoo = obj.kind === 'foo';
    obj = obj;
    if(isFoo) {
        obj.foo // obj在函数体中被赋值
    }
}

// 类型谓词 类型谓词是返回布尔值的函数，用于将变量的类型缩小为更具体的类型
const isString = (value: unknown): value is string => typeof value === 'string';
const foo = (bar: unknown) => {
    if(isString(bar)) {
        console.log(bar.toUpperCase());
    } else {
        console.log('not a String');
    }
}

// 可区分联合 使用称为判别式的公共属性来缩小联合的可能类型集
type Square = {
    kind: 'square'; //判别式
    size: number;
}

type Circle = {
    kind: 'circle'; //判别式
    radius: number;
}

type Shape = Square | Circle;

const area = (shape: Shape) => {
    switch (shape.kind) {
        case 'square': 
            return Math.pow(shape.size, 2);
        case 'circle':
            return Math.PI * Math.pow(shape.radius, 2);
    }
}

const square: Square = { kind: 'square', size: 5};
const circle: Circle = { kind: 'circle', radius: 2};

console.log(area(square));
console.log(area(circle));

// never类型，代码永远无法生成的值
const printValue = (val: string | number) => {
    if(typeof val === 'string') {
        console.log(val.toUpperCase());
    } else if (typeof val === 'number') {
        console.log(val.toFixed(2));
    } else {
        const neverVal: never = val;
        console.log(`Unexpected value: ${neverVal}`);
    }
}

// 详尽性检查 确保在 switch 语句或 if 语句中处理可区分联合的所有可能情况
type Direction = 'up' | 'down';
const move = (direction: Direction) => {
    switch(direction)  {
        case 'up':
            console.log('Moving up');
            break;
        case 'down':
            console.log('Moving down');
            break;
        default:
            const exhaustiveCheck: never = direction;
            console.log(exhaustiveCheck); // 不会被执行
    }
} 

// 对象类型 对象类型描述对象的形状
interface  User {
    name: string;
    age: number;
    email?: string
}
type Point = { //还可以基于现有类型或现有类型的组合创建新的自定义类型。这包括定义联合类型、交集类型和其他复杂类型
    x: number;
    y: number
}
const sum = (x:{ a: number; b: number}) => x.a + x.b;
console.log(sum({a: 5, b: 1}));

// 元组类型（匿名）表示具有固定数量的元素及其相应类型的数组的类型
type Point1 = [number, number];

// 命名元组类型(已标记) 元组类型可以包含每个元素的可选标签或名称
type T = string;
type Tuple1 = [T, T];
type Tuple2 = [a: T, b:T];
type Tuple3 = [a: T, T];

// 固定长度元组 是一种特定类型的元组，它强制执行特定类型的固定数量的元素，并且一旦定义元组就不允许对其长度进行任何修改
const x = [10, 'hello'] as const;
x.push(2);

// 联合类型 是一种表示值的类型，该值可以是多种类型之一。联合类型使用 | 表示 每种可能类型之间的符号
let x1: string | number;
x1 = 'hello';
x1 = 23;

// 交集类型 表示具有两种或多种类型的所有属性的值的类型
type X = {
    a: string;
}
type Y = {
    b: string;
}

type J = X &  Y;
const j: J  = {
    a: 'a',
    b: 'b',
}

// 索引类型 能够通过预先未知的键来定义可以索引的类型，使用索引签名来指定未显式声明的属性的类型
type Dictionary<T> = {
    [key: string]: T
}
const myDict: Dictionary<string> = {a: 'a', b: 'b'};
console.log(myDict['a']);

// 值的类型 通过类型推断从值或表达式自动推断出类型
const x2 = 'x';

// Func 返回值的类型,指根据函数的实现自动推断函数的返回类型的能力
const add = (x: number, y: number) => x + y;

// 模块的类型,指使用模块的导出值自动推断其类型的能力
export const add1 = (x: number, y: number) => x + y;
import { add1 } from 'calc';
const res = add1(1, 2);

// 映射类型 允许通过使用映射函数转换每个属性来基于现有属性创建新属性
type MyMappedType<T> = {
    [P in keyof T]: T[P][];
}
type MyType = {
    foo: string;
    bar: number;
}
type MyNewType = MyMappedType<MyType>;

const xMap: MyNewType = {
    foo: ['hello', 'world'],
    bar: [1, 2, 3]
}

// 映射类型修饰符
type ReadOnly<T> = { +readonly [P in keyof T]: T[P] }; //只读
type Mutable<T> = { -readonly [P in keyof T]: T[P] }; //可变
type Mypartial<T> = { [P in keyof T]?: T[P]};

// 条件类型 创建依赖于条件的类型的方法,其中要创建的类型是依据条件的结果确定的
type IsArray<T> = T extends any[] ? true : false;
const myArray = [1, 2, 3];
const myNumber = 42;
type IsMyArrayAnArray = IsArray<typeof myArray>; // true类型
type IsMyNumberAnArray = IsArray<typeof myNumber>; // false类型

// 分配条件类型，是一种功能，通过单独对联合的每个成员应用转换，允许类型分布在类型的联合上。当使用映射类型或高阶类型时，这尤其有用
type Nullable<T> = T extends any ? T | null : never;
type NumberOrBool = number | boolean;
type NullableNumberOrBool = Nullable<NumberOrBool>

// infer 条件类型中的类型推断，用于从依赖于泛型参数的类型中推断（提取）泛型参数的类型
type ElementType<T> = T extends (infer U)[] ? U: never;
type Numbers = ElementType<number[]>; // number
type Strings = ElementType<string[]>; // string

// 模板联合类型，可用于合并和操作类型系统内的文本
type Status = 'active' | 'inactive';
type Products = 'p1' | 'p2';
type ProductId = `id-${Products}-${Status}`;

// 未知类型 unknown 类型只能分配给任何类型和未知类型本身，它是any 的类型安全替代方案
let valueX: unknown;
let value1: unknown = valueX; //有效
let value2: any = valueX; //有效
let value3: boolean = valueX; //无效
let value4: number = valueX; //无效

// 空类型 用于指示函数不返回值
const sayHelloX = (): void => {
    console.log('Hello!');
}

// never 类型表示从未出现过的值。它用于表示从不返回或抛出错误的函数或表达式
const infiniteLoop = (): never => {
    while(true) {
        // TODO
    }
}
const throwError = (message: string): never => {
    throw new Error(message);
}

// 接口及类型
interface InterfaceName {
    property1: Type1;
    method(arg1: ArgType1, arg2: ArgType2): ReturnType;
}
type TypeName = {
    property1: Type1;
    method(arg1: ArgType1, arg2: ArgType2): ReturnType;
}

interface Person {
    name: string;
    age: number;
    greet():void;
}
type TypeName1 = {
    propertype1: string;
    method1(arg1: string, arg2: string): string
}
let myNumber1: number = 123;
let myBoolean: boolean = true;
let myArray1: string[] = ['a', 'b'];
let myTuple: [string, number] = ['a', 123];
// 对象和接口
const x3: { name: string; age: number} = {name: 'allen', age: 20};
// 并集和交集
type MyType1 = string | number;
let myUnion: MyType1  = 'hello';
myUnion = 123;
type TypeA = { name: string};
type TypeB = { age: number};
type CombineType = TypeA & TypeB;
let myCombined: CombineType = { name: 'Linda', age: 10};

// 重载 允许您为单个函数名称定义多个函数签名，从而使您能够定义可以多种方式调用的函数
function sayHello(name: string): string;
function sayHello(names: string[]): string[];
function sayHello(name: unknown):unknown {
    if(typeof name === 'string') {
        return `Hi, ${name}`;
    } else if(Array.isArray(name)) {
        return name.map(name => `Hi,${name}!`);
    }

    throw new Error('Invalid value');
}
sayHello('xx'); //有效
sayHello(['aa', 'bb']);
// class 重载
class Greeter {
    
}
 