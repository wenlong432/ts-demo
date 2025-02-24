// 字面量
// const a= 'a';
// const b = 1;
// const c = true;

// type O = 'a' | 'b' | 'c';

// 字面量推断
// const x = 'x';
// let y = 'y';

// type X = 'a' | 'b';

// let o = {
//     x: 'a'
// }

// const fn = (x: X) => `${x}-foo`

// console.log(fn(o.x));

// let o = {
//     x: 'a' as X
//     // x: 'a' as const
// }
// console.log(fn(o.x));

// 枚举 一组命名常量值
// enum Color {
//     Red = '#ff0000',
//     Green = '#00ff00',
//     Blue = '#0000ff'
// }

// enum Size {
//     // Small, // 数字枚举
//     Small = 10, // 数字枚举
//     Medium,
//     Large
// }

// enum Language {
//     // 字符串枚举
//     English = 'EN',
//     Spanish = 'ES'
// }
// console.log(Language.English);
// 反向映射(数字类型支持
// enum Grade {
//     A = 90,
//     B = 100,
//     C = 'XX'
// }

// const myGrade = Grade.A;
// console.log(Grade[myGrade]); // A
// console.log(Grade[90]); // A

// const failGrade = Grade.C;
// console.log(failGrade);
// console.log(Grade[failGrade])

// 计算成员和常量成员
// enum Color {
//     Red = 1,
//     Green = 5,
//     Blue = Red + Green
// }

// console.log(Color.Red);

// enum Color {
//     Red = 1,
//     Green = Math.pow(2, 2),
//     Blue = Math.floor(Math.random() *3) + 1
// }
// console.log(Color.Blue);

// const identity = (value: number) => value;
// enum E {
//     A = 2 * 5,
//     B = 'bar',
//     C = identity(42)
// }
// console.log(E.C);


// 缩小范围
// 类型保护
const fn = (x: number | string) => {
  if(typeof x === 'number') {
      return x + 1;
  }

  return -1;
}
// 真实性缩小
const toUpperCase = (name: string | null) => {
  if(name) {
      return name.toUpperCase();
  } else {
      return null
  }
}
// 相等缩小
const checkStatus = (status: 'success' | 'error') => {
  switch(status) {
      case 'success':
          return true
      case 'error':
          return null
  }
}
// In运算符缩小
type Dog = {
  name: string;
  breed: string
}

type Cat = {
  name: string,
  likesCream: boolean
}

const getAnimalType = (pet: Dog | Cat) => {
  if('breed' in pet) {
      return 'dog';
  } else {
      return 'cat'
  }
}

// instanceof 缩小
class Square {
  constructor(public width: number) {}
}

class Rectangle {
  constructor(
      public width: number,
      public height: number
  ){}
}

function area(shape: Square | Rectangle) {
  if(shape instanceof Square) {
      return shape.width * shape.width;
  } else {
      return shape.width * shape.height;
  }
}

const square = new Square(5);
const rectangle = new Rectangle(5, 10);
console.log(area(square));
console.log(area(rectangle));