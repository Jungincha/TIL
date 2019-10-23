// 주어진 두 숫자에 대한 최대공약수(greatest common divisor)를 구하세요

// My
function gcd(num1, num2) {
    // 작은수 찾기
    let sNum = Math.min(num1, num2);
    let bNum = Math.max(num1, num2);
    // 작은수에서 하나씩 작아지게 반복해서 작은수가 큰수를 나눌 수 있으면 최대공약수 
    for(let i = sNum; i > 0; i--) {
      if(bNum % i === 0 && sNum % i === 0) {
        return i;
      }
    }
  }
  
  // Model
  function gcd(num1, num2) {
    return num2 ? gcd(num2, num1 % num2) : num1;
  }

  // 어떤 짝수에 대해서 골드바흐의 추측이 맞는지 확인하시오. 이때 표현할 수 있는 것의 갯수가 2개 이상이면 두 수의 차가 가장 큰 것을 출력하시오.

  // My 
  function goldbachsConjecture(num) {
    for(let j = 2; j <= num - 2; j++) {
      if(primeNumber(j) === true) {
        let restNum = num - j;
        if(primeNumber(restNum)) {
          return `${num} = ${j} + ${restNum}`;
        }
      }
    }
  };

  function primeNumber(num){
    if(num < 2) {
      return false;
    }
    for(let i = 2; i < num; i++){
      if(num % i === 0){
        return false;
      }
    }
    return true;
  }

  // Model

  function goldbachsConjecture(num) {
    // your code here
    for(let j = 2; j < num; j++){
      if(primeNumber(j) && primeNumber(num - j)){
        return num + ' = ' + j + ' + ' + (num - j);
      }
    }
  };
  
  function primeNumber(num){
    if(num < 2){
      return false;
    }
    for(let i = 2; i < num; i++){
      if(num % i === 0){
        return false;
      }
    }
    return true;
  }

// 성준이는 1부터 n까지 숫자를 적던 중 깜빡하고 하나의 숫자를 빼먹었다. 그 빼먹은 숫자를 찾으시오.

// My 
function findMissingNumber(str) {
    let nums = str.split(" ");
   
    nums = nums.map(cur => parseInt(cur)).sort((a, b) => a - b);
   
   
    for(let i = 1; i <= nums.length; i++) {
      if(i !== nums[i-1]) {
        return i;
      }
    }
   
    
   }

// Model
function findMissingNumber(str) {
    let array = str.split(' ').map(Number);
    let largest = array.length + 1;
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
      sum += array[i];
    }
    return largest * (largest + 1) / 2 - sum;
  }

  
/*
어느날, 성준이는 우연히 길거리에서 양수 N을 보았다. 성준이는 30이란 수를 존경하기 때문에, 
그는 길거리에서 찾은 수에 포함된 숫자들을 섞어 30의 배수가 되는 가장 큰 수를 만들고 싶어한다. 
성준이를 도와 그가 만들고 싶어하는 수를 계산하는 프로그램을 작성하라. (그 수가 존재한다면)
출력 : 성준이가 만들고 싶어하는 수가 존재한다면 그 수를 출력하라. 그 수가 존재하지 않는다면, -1을 출력하라.
*/

// My 

// 30의 배수는 3의 배수이면서 일의 자리가 0인 수이다.
// 3의 배수는 각 자리 숫자의 합이 3의 배수인 수이다.

function findMaxOnMultiplesOfThirty(num) {
  // 숫자들을 array에 넣기 + sort 내림차순으로 정렬
  // 우선 모든 숫자들의 합이 3의 배수이면서 0이 존재하는지 검사 
  // 검사 통과하면 숫자 합쳐서 리턴 아니면 -1반환

  const strToInt = cur => parseInt(cur);
  const bigToSmall = (a, b) => b - a;
  const reduceFunc = (a, c) => a + c;

  const numArr = String(num).split("").map(strToInt).sort(bigToSmall); 
  
  if(numArr[numArr.length - 1] === 0 && numArr.reduce(reduceFunc)) {
    return Number(numArr.join(''));
  } else {
    return -1;
  }
}

// Model

function findMaxOnMultiplesOfThirty(num) {
  var sum = 0;
  var str = String(num)
  var split = str.split('');
  for(var i = 0; i < str.length; i++) {
    sum = sum + Number(str[i]);
  }
  if(str.includes(0) === false || (sum % 3 !== 0)) {
    return -1;
  }
  else if(str.includes(0) === true && (sum % 3 === 0)) {
    split.sort(function(a,b) {
      return b - a;
    })
    return Number(split.join(''));
  }
}

/*
Week 9-1 sumOnMultiplicationOfOrderedPairs
입력한 숫자에 대해 서로 다른 두 숫자의 모든 경우에 대해, 곱의 합을 구하세요.
sumOnMultiplicationOfOrderedPairs(2, 3, 4) // 26
위 코드의 결과가 26이 나오는 이유는 다음을 참조하세요.

가능한 조합(Pair)은 다음과 같습니다.

(2, 3)
(2, 4)
(3, 4)
*/

// 삽질한 흔적... 이 코드는 args의 element가 중복이 되지 않을 때만 유효하다 

function sumOnMultiplicationOfPairs(...args) {
  // 모든 경우의 수의 조합을 만들어 array로 묶기(이 단계에서 더할 수 있으면 더하기)
  // 그걸 큰 array에 집어넣기 (중복검사)
  // 조합들을 모두 곱하고, 큰 array를 마저 더하기
  let combArr = []; 
  for(let i = 0; i < args.length; i++) {
    for(let j = 0; j < args.length; j++) {
     if(i !== j) {
      let comb = [args[i], args[j]].sort((a,b) => a - b);
      let newCombArr = combArr.map(cur => JSON.stringify(cur));
      if(!(newCombArr.includes(JSON.stringify(comb)))) {
        combArr.push(comb);
      }
     }
    }
  } 
  const reduceMul = (a, c) => a * c;
  const reduceAdd = (a, c) => a + c;
  
  return combArr.map(cur => cur.reduce(reduceMul)).reduce(reduceAdd);
  
}
sumOnMultiplicationOfPairs(2, 3, 4); 

// Model

function sumOnMultiplicationOfPairs(...array) {
  let sum = 0;
  let result = 0;
  for (let i = 0; i < array.length; i++) {
    if (i !== 0) {
      result += sum * array[i];
    }
    sum += array[i];
  }
  return result;
}

/*
숫자가 주어졌을때, threeFiveMultiples(num) 함수는 해당 숫자보다 
작은 3 혹은 5의 배수들의 총합을 반환합니다.
예시: 만약 10이 주어졌다면, 10 보다 작은 3과 5의 배수들은 3, 5, 6, 9 가 있으며 
해당 숫자들을 모두 더하면 23 이 나오므로 여러분이 작성하진 함수는 23 을 반환해야 합니다.
*/

// My 

function threeFiveMultiples(num) {
  // 3의 배수 누적 더하기 결과값
  // 5의 배수 누적 더하기 결과값
  // 두개 더하기
  // 해보기 두개 같이 해도 되더라 
  let result = 0;
  for(let i = 1; i < num; i++) {
    if(i % 3 === 0 || i % 5 === 0) {
      result += i;
    }
  }
  return result;
}

// Model 
// Exactly same with my solution


/**
 문자열이 주어졌을때, runLength(str) 함수는 Run-length 인코딩 알고리즘을 사용하여 주어진 문자열을 압축하여 반환합니다.
해당 알고리즘은 반복되는 글자가 있을경우 반복되는 수와 해당 글자를 조합하여 문자열을 압축시킵니다.
예시: wwwggopp 는 3w2g1o2p 로 압축됩니다. 주어지는 문자열은 숫자나, 구두점이나, 문자를 포함하고 있지 않습니다.
 */

// My 
// 처음에 생각했던 솔루션 
// 근데 이 솔루션은 스트링 전체에서 해당 문자가 몇개 인지 검사해 나타내주는 거기 때문에
// 인코딩 알고리즘에 적합하지 않음 
function runLength(str) {
  let strArr = str.split("");
  let obj = {}, result = "";
  
  
  strArr.forEach(cur => {
    obj[cur] = ++obj[cur] || 1;
  })

  for(let key in obj) {
     result += (obj[key] + key);
  }

  return result;
}

// My second solution 

function runLength(str) {
  let strArr = str.split("");
  let result = "", count = 1;

  
  strArr.forEach((cur, i) => {
      if(cur === strArr[i+1]) {
        ++count;
      }else {
        result += count + cur;
        count = 1;
      }
    })

  return result;
}

runLength("EDNSOEQTWVOQQVDVRC") //"1E1D1N1S1O1E1Q1T1W1V1O2Q1V1D1V1R1C"

// Model
// 겁나 비효율적 ^^ 복잡도 O(n**2) 누가 만들었냐 ^^ 

function runLength(str) {
  var i = 0;
  var rle = "";
  while (i < str.length) {
    var c = str[i];
    var j = i + 1;
    var compressed = [1, c];

    while (j < str.length) {
      if (str[j] === c) {
        compressed[0] += 1;
      } else {
        break;
      }
      j++;
    }

    rle += compressed.join('');
    i = j;
  }

  return rle;
}

/**
 문자열로 이루어진 배열이 주어졌을때, thirdGreatest(strArr) 함수는 주어진 배열에서 세번째로 긴 단어를 반환합니다. 
 그 중, 동률일때는 뒤에 있는 단어를 반환해줘야 합니다.
예를 들어, 주어진 배열이 ["hello", "world", "before", "all"] 라면, 결과값은 world 가 될것입니다. 
왜냐하면 before는 6글자이고 hello와 world 둘다 5글자 이지만 world가 더 뒤에 나온 5글자 단어이기 때문입니다.
만약 주어진 배열이 ["hello", "world", "after", "all"] 이라면 결과값은 after가 될것입니다. 
왜냐하면 앞에 세 단어가 모두 5글자이기 때문에 마지막 단어를 반환하기 때문입니다. 
배열은 항상 적어도 문자열 세개를 가지고 있으며, 각각의 문자열은 오직 글자만을 포함하고 있습니다.
 */

// My 

function thirdGreatest(arr) {
  // sort로 배열 큰거부터 정리
  // array에 세번째있는 애 추출

  return arr.sort((a,b) => b.length - a.length)[2];
}

// Model

function thirdGreatest(arr) {
  arr = arr.sort(function(a, b) {
    return b.length - a.length;
  });
  return arr[2];
}

/*
+, -, 그리고 괄호를 가지고 길이가 최대 50인 식을 만들었다. 
그리고 나서 성준 이는 괄호를 모두 지웠다. 
그리고 나서 괄호를 적절히 쳐서 이 식의 값을 최소로 만드려고 한다. 
괄호를 적절히 쳐서 이 식의 값을 최소로 만드는 프로그램을 작성하시오.
findMinByBracket('55-50+40') // -35
*/

// My 
// pseudo 코드랑 좀 다르게 문제를 풀어나갔음
// 1) '-'나오는 부분으로 split하기
// 2) spit한 array를 돌며 eval로 계산해놓기
// 3) join할 때 다시 '-'넣어주고 전체 str을 다시 '-'로 합쳐 eval로 return! 
// 잼땨ㅑㅑㅑㅑㅑㅑ <3

function findMinByBracket(str) {
  
  //str arr에다 넣고 
  // iterator 사용해서 -나오면 () 집어넣기
  // 다시  .join() 시키기
  // eval 시켜서 return 하기 
  let strArr = str.split('-');

  strArr = strArr.map((cur, i) => {
    return eval(cur);
  })
  return eval(strArr.join('-'));
}

// Model ==> 겁나 난해 

function findMinByBracket(str) {
  var cnt = 0;
  for (let i = 1; i < str.length ; i +=1 ) {
    if (str[i] == "+") {
      cnt += 1;
    } else if (str[i] == '-') {
      break;
    }
  }
  var separators = [' ', '+', '-'];
  var tokens = str.split(new RegExp('[' + separators.join('') + ']', 'g'));

  var sum = Number(tokens[0]);
  console.log(tokens, cnt);
  var temp = 0;
  for(let i = 1; i < tokens.length; i += 1) {
    if (temp < cnt) {
      sum += Number(tokens[i]);
    } else {
    sum -= Number(tokens[i]);
    }
    temp ++;
  }
  return sum;
}

/*
문자열이 주어졌을때, numberSearch(str) 함수는 주어진 문자열에서 숫자를 모두 찾아 더한 뒤 해당 값을 
(숫자, 공백 등을 제외한) 알파벳의 길이의 길이로 나눈 값을 정수로 반올림하여 반환합니다.
예시: 만약 문자열 Hello6 9World 2, Nic8e D7ay! 이 주어졌다면, 결과값은 2 입니다.
우선 모든 숫자를 더하면 6 + 9 + 2 + 8 + 7 = 32 가 나오게됩니다.
그 후 (숫자, 공백 등을 제외한) 알파벳의 길이가 17이기 때문에 32/17 = 1.882 가 나오게 되며, 
가까운 정수로 반올림을 하게되면 정답인 2가 나오게 됩니다.
*/

// My 

function numberSearch(str) {
  // 번호 추출 후 더하기
  // 숫자, 공백 뺀 알파벳 길이 구하기
  // 숫자를 알파벳의 길이로 나누고, 반올림해서 리턴!!

  let strArr = str.split('');
  let numSum = str.match(/\d/g).reduce((a,c) => parseInt(a) + parseInt(c));

  strArr = strArr.filter(cur => cur.match(/\w/g) && !(cur.match(/\d+/g)));
  let strLeng = strArr.length;

  return Math.round(numSum / strLeng);
}

// Model 
// 대박 string 으로 '1' > '0' 이나 'h' > 'a' 될줄 몰랐음 
// 대박!!!!!!!
function numberSearch(str) {
  let numSum = 0;
  let strCnt = 0;
  for (let i = 0 ; i < str.length; i += 1) {
    if (str[i] >= '0' && str[i] <= '9') {
      numSum = numSum + Number(str[i]);
    } else if((str[i] >= 'a' && str[i] <= 'z') || (str[i] >= 'A' && str[i] <= 'Z')) {
      strCnt = strCnt + 1;
    }
  }
  return Math.round(numSum/strCnt);
}

/*
숫자로 이루어진 배열이 주어졌을때, superIncreasing(arr) 함수는 해당 배열이 superIncreasing 조건을 
만족하는지 반환합니다. 배열의 모든 요소들이 해당 요소들 앞에 있는 요소들 전체의 합보다 크면 superIncreasing 
조건을 만족하는 배열이라 할 수 있습니다.
(예시: 만약 주어진 배열이 [1, 3, 6, 13, 54] 라면 superIncreasing 
  조건에 만족하기 때문에 여러분의 함수는 true를 반환해야 합니다. 
  만약 superIncreasing 조건에 만족하지 않는다면 여러분의 함수는 false를 반환해야 합니다.)
*/

// My
// 처음에 문제를 잘못이해해서, 모든 엘리먼트가 자신의 바로앞 엘리먼트보다 크면 true를 반환하게 설게 

function superIncreasing(arr) {
  let resultArr =[]
  for(let i = 1; i < arr.length; i++) {
    if(arr[i-1] < arr[i]) {
      resultArr.push(true);
    }else {
      resultArr.push(false);
    }
  }

  return resultArr.every(cur => cur === true);
}

// 수정한 sol 

function superIncreasing(arr) {

  let resultArr = [];
  
  function addFunc(a, c) {
    return a + c;
  }

  for(let i = 1; i < arr.length; i++) {
    if(arr[i] > arr.slice(0,i).reduce(addFunc)) {
      resultArr.push(true);
    }else {
      resultArr.push(false);
    }
  }
  return resultArr.every(cur => cur === true);
}

// Model
// 합보다 크기가 작기만 하면 바로 false를 반환하기때문에
// 내 솔루션처럼 리스트 저장이 불필요, 더 간단 
function superIncreasing(arr) {
  let sum = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] <= sum) {
      return false;
    }
    sum = sum + arr[i];
  }
  return true;
}

/*
양의 정수가 주어졌을때, multiplicativePersistence(num) 함수는 주어진 수의 각 자리의 숫자를 곱했을때 
한 자릿수가 될때까지의 계산 횟수를 반환합니다.
예시: 만약 입력값이 39라면, 여러분의 함수는 3을 반환해야 합니다.
왜냐하면
3 * 9 = 27
그리고 2 * 7 = 14
그리고 마지막으로 1 * 4 = 4 이므로 한 자리가 될 때까지 총 3번의 계산을 하기 때문입니다.
*/

// My 

function multiplicativePersistence(num) {
  // while 반복문 안에서 계산, 한자리 숫자가 되면 탈출
  // count 있어야 됨. 이게 리터값
  let count = 0 ;
  while(num > 10) {

    num = String(num).split('').reduce((a,c) => a * c);
    count ++;
  }
  
  return count;
}

// Model 

function multiplicativePersistence(num) {
  let count = 0;
  num = String(num);
  while (num.length >= 2) {
    count += 1;
    num = '' + num.split('').reduce(function(total, n) {
      return total * n;
    });
  }
  return count;
}

/*
Have the function primeMover(n) return the n-th prime number. 
The range will be from 1 to 5 * 10^4; (숫자(n)가 주어졌을때, 
'primeMover(n)' 함수는 num 번째 소수를 반환합니다. 범위는 1에서 50,000 입니다.)
For example: if n is 16 the output should be 53 as 53 is the 16th prime number. 
(예시: 만약 n 이 16이라면, 결과값은 16번째 소수인 53 입니다.)
*/

// My 

let primeMover = function(n) {
  // Storing prime Number
  let primeNumArr = [];

  // function that checks primeNumber
  function checkPrime(num) {
    if(num <= 1) return false;

    if(num % 2 === 0) {
      return num === 2 ? true : false;
    }
    for(let i = 3; i <= Math.sqrt(num); i += 2) {
      if(num % i === 0) return false;
    }

    return true;
  }
  
  // Putting prime number in the Array
  for(let j = 1; j <= 5*10**4; j++){
    if(checkPrime(j) === true) {
      primeNumArr.push(j);
    }
  }

  // return nth Prime Number
  return primeNumArr[n-1];
}

// Model
// 그때 그때 count를 해서 따로 저장공간을 만들지 않았음 

let isPrime = function(n) {
  if (n < 2) {
    return false;
  }
  for (let i = 2; i < n; i += 1) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}

let primeMover = function(num) {
  num = Number(num);
  let count = 0;
  let n = 0;
  while (count !== num) {
    n += 1;
    if (isPrime(n)) {
      count += 1;
    }
  }
  return n;
}

/*
An isogram is a word that has no repeating letters, consecutive or non-consecutive. 
(isogram 은 이어져 있든 이어져있지 않든 같은 문자가 반복되지 않는 단어를 말합니다.) 
Implement a function that determines whether a string that contains 
only letters is an isogram. (문자열이 주어졌을때, 해당 문자열이 isogram 인지 확인해주는 함수를 작성하세요.)
Assume the empty string is an isogram. Ignore letter case. 
(빈 문자열은 isogram 으로 간주합니다. 대소문자는 무시하세요.)
*/

// My 

let isIsogram = function(str) {
  let obj = {};
  
  // 다 소문자로 변경
  str = str.toLowerCase();

  // 스트링 돌아가면 나온 알파벳 수를 오브젝트에 저장
  str.split('').forEach(cur => {
    obj[cur] = ++obj[cur] || 1;
  })

  // 하나라도 obj[key] 값이 2이상이면 false
  for(key in obj) {
    if(obj[key] > 1) {
      return false
    }
  }

  return true;
}

// Model
// storage를 똑같이 만들지만, 키를 넣어주는 과정에서 두번이상 호출이 되면 바로 false 리턴
// 더효율적 

let isIsogram = function(str) {
  if(str.length === 0) {
    return true;
  }

  let storage = {};
  let strLowerCase = str.toLowerCase();

  for(let i = 0; i < strLowerCase.length; i++) {
    if(storage[strLowerCase[i]]) {
      return false;
    }
    storage[strLowerCase[i]] = 1;
  }

  return true;
}

/*
letterCapitalize(str)는 문자열을 parameter로 받는 함수로, 
문자열의 각 단어의 첫번째 글자를 대문자로 만듭니다.
단어는 하나의 공백으로 구분됩니다.
*/

// My
function letterCapitalize(str) {
  // 스트링을 리스트에 넣어주기 
  let strToArr = str.split('');

  // 스트링 돌아가며 가장 첫인덱스나, 자신의 인덱스 바로 앞 인데스가 공백이면 대문자로 바꿔주기
  strToArr.forEach((cur, i) => {
    if(i === 0 || strToArr[i-1] === " ") {
      strToArr[i] = cur.toUpperCase(); //.toUpperCase()는 immutable이기 때문에 저장을 꼭 하기
    }
  })
  return strToArr.join('');
}

letterCapitalize('mond');

// Model 
// split을 단어별로 해서 더 간단하게 풀어냄!
function letterCapitalize(str) {
  let words = str.split(' ');

  for(let i = 0; i < words.length; i++){
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }

  str = words.join(' ');

  return str;
}

/*
powerOfTwo (num) 함수는 num parameter를 가져와서 정수이며, 동시에 2의 거듭제곱이면 true를 반환합니다.
JavaScript 언어의 내장 메소드를 사용하여 구현할 수 있습니다.
*/

// My 
function powerOfTwo(num) {
  // 정수인지 체크, 2의 거듭제곱인지 체크
  // 둘다 만족하면 트루 리턴

  if(num === 2) return true;
  else if(num % 2 === 1 || num != Math.round(num)) return false
  else return powerOfTwo(num / 2);
}


// Model
// 아름답다...
// 로그 다 까먹었는데 .... 흑
// 수학 공부를 다시 해야되나 ^^.....
function powerOfTwo(num) {
  return Number.isInteger(Math.log2(num));
}

/*
In this exercise, you are required to, given a string, 
replace every letter with its position in the alphabet. 
(문자열이 주어졌을때, 각각의 문자를 알파벳의 몇번째 인지 숫자로 바꾸는 함수를 작성하세요.) 
If anything in the text isn't a letter, ignore it and don't return it. 
a being 1, b being 2, etc. (만약 문자가 알파벳이 아니라면, 무시하고 결과값에 포함하지 마세요. 
a 는 1, b 는 2, 등등 으로 변환됩니다.)
alphabetPosition("The sunset sets at twelve o' clock."); 
// "20 8 5 19 21 14 19 5 20 19 5 20 19 1 20 20 23 5 12 22 5 15 3 12 15 3 11"
*/

// My

var alphabetPosition = function(str) {
  // str을 모두 소문자로 만들것
  // str을 리스트에 넣은뒤 돌아가며 알파벳인지 검사
  // 알파벳이라면 아스키코드 이용해서 숫자로 변환하고 새로운 리스트에 넣기
  // 리스트 리턴할 때 공백 넣어서 조인으로 리턴
  let alpToNum = [];
  let alphabet = /[a-z]/g;

  str = str.toLowerCase();
  
  str.split('').forEach(cur => {
    if(cur.match(alphabet)) {
      alpToNum.push(cur.charCodeAt() - 96);
    }
  })
  
  return alpToNum.join(' ');
}

// Model

function alphabetPosition(string) {
  let chars = 'abcdefghijklmnopqrstuvwxyz'.split('')

  string = string.toLowerCase();

  let charArr = string.split('')

  return charArr.map(function(char) {
    return chars.indexOf(char) + 1
  }).filter(function(position) {
    return position !== 0;
  }).join(' ')

}

/*
Have the function DashInsert insert dashes ('-') between each two odd numbers in str. 
(문자열이 주어졌을때, 'DashInsert' 함수는 문자열에 있는 두 홀수 사이에 대시('-')를 추가하여 반환합니다.)
DashInsert('454793'); // "4547-9-3"
*/

// My 

function DashInsert(string) {
  // split the string into the list
  // check if the odd num is next to eachother
  // if it is, add '-' inside the current index 

  let strArr = string.split('');

  strArr.forEach((cur,i) => {
    if(cur % 2 === 1 && strArr[i+1] % 2 === 1) {
      strArr[i] = cur + '-';
    }
  })

  return strArr.join('');
}

// Model
// how does string[i] % 2 work? 
// because 1 is true and 0 is false? 
function DashInsert(string) {
  let result = '';

  for (let i = 0; i < string.length; i++) {
    result = result + string[i];
    
    if (string[i] % 2 && string[i + 1] % 2) {
      result = result + '-';
    }
  }

  return result;
}

/*
Using the JavaScript language, 
have the function LongestWord take the sen parameter being passed and return the largest word in the string. 
(문장이 주어졌을때, 'LongestWord' 함수는 주어진 문장에서 가장 긴 단어를 반환합니다.)
If there are two or more words that are the same length, 
return the first word from the string with that length. 
Assume sen will not be empty. 
(만약 가장 긴 단어가 두개 이상이라면, 첫번째로 등장하는 가장 긴 단어를 반환하세요. 문장은 빈 문자열이 아닙니다.)
longestWord("I love codestates"); // => "codestates"
*/

// My 
function longestWord(string) {
  // Put strings in the list and sort with length(longest -> shortest)
  // return the 0 index of the list

  return string.split(' ').sort((a,b) => b.length - a.length)[0];
}

// Model
function longestWord(string) {
  let words = string.split(' ');
  
  return words.reduce(function(acc, curr) {
    if (acc.length < curr.length) {
      return curr
    }
    return acc
  }, '')
}

/*
In this exercise, a string is passed to a method and a new string has to be returned 
with the first character of each word in the string 
(문자열이 주어졌을때, "firstCharacter" 함수는 문자열의 각 단어 첫글자들로 이루어진 문자열을 반환하여야 합니다.)
*/

// My

function firstCharacter (string) {
  // split string in to array
  // use map to get the 0 index of each element
  // join it into a string

  let newStr = string.split(' ').map(cur => cur[0]).join('');
  return newStr;
}

// Model

function firstCharacter(string) {
  let words = string.split(' ');
  let result = '';
  for (let i = 0; i < words.length; i += 1) {
    result = result + words[i][0];
  }
  return result;
}
/*
convert nested (2-dimensional) array to flatten array! (2차원 배열을 1차원 배열로 전환하세요.)
*/

// My 1st 

function flatten (array){

  return String(array).split(',').filter(cur => parseInt(cur, 10)).map(cur => Number(cur));
}

// My 2nd
// Jesus... I totally forgot about concat

function flatten (array){
  array = array.filter(el => el.length !== 0);

  array.forEach((el, i) => {

    if(Array.isArray(el)) {
      
      if(el[0] === null) {
        array[i] = null;
      } else if (el.includes(true) || el.includes(false)) {
        el.forEach(el2 => array.push(el2));
        array.splice(i,1);
      } else { 
        if (parseInt(el[0], 10)) {
          array[i] = parseInt(String(el[0]), 10);
        } else {
          array[i] = String(el);
        }

      }
      
    }

  });

  return array;
}

// Model

function flatten (array){
  return array.reduce(function(acc, curr) {
    return acc.concat(curr);
  }, []);
}

/*
Find out "B"(Bug) in a lot of "A"(Apple). (수많은 "A"(Apple) 사이에서 "B"(Bug)를 찾으세요.)
There will always be one bug in apple, not need to consider the situation 
that without bug or more than one bugs. 
(사과(apple) 사이에는 언제나 항상 한개의 벌레(bug)가 있으므로 
벌레가 없는 경우나 한개 이상인 경우는 고려하지 않으셔도 됩니다.)
Note: 2-dimesional Array will be input. (노트: 2차원 배열이 매개변수로 주어집니다.)
*/


// My 
let bugInApple = function(array) {
  // loop array find the element that includes 'b'
  // find the 'b' index
  // return an new array [element index, b index]

  let result = [];
  array.forEach((el, i) => {
    if(el.includes("B")) {
      result.push(i);
      const bIndex = el.findIndex(cur => cur === "B");
      result.push(bIndex);
    }
  });
  return result;
}

// Model
let bugInApple = function(apple) {
  for (let i = 0; i < apple.length; i += 1) {
    for (let j = 0; j < apple[i].length; j += 1) {
      if (apple[i][j] === 'B') {
        return [i, j];
      }
    }
  }
}

/*
Using the JavaScript language, 
have the function firstReverse(str) take the str parameter 
being passed and return the string in reversed order. 
(firstReverse(str) 함수를 작성하세요. 문자열(str)이 주어졌을때, 
firstReverse(str) 함수는 주어진 문자열을 역순으로 반환합니다.)
*/

// My 

function firstReverse(str) {
  
  let newStr = "";

  for(let i = str.length - 1; i >= 0; i--) {
    newStr += str[i];
  }

  return newStr;
}

// Model

function firstReverse(str) {
  return str.split('').reverse().join('');
}

/*
Using the JavaScript language, have the function ABCheck(str) 
take the str parameter being passed and return the true 
if the characters a and b are separated by exactly 3 places 
anywhere in the string at least once Otherwise return the false. 
(ABCheck(str) 함수를 작성하세요. 문자열(str)이 주어졌을때, 
ABCheck(str) 주어진 문자열에서 함수는 문자 a 와 b 사이가 문자열 안에서 한번이라도 
정확히 3글자 떨어져 있으면 true를 반환하고 그렇지 않은 경우는 모두 false 를 반환합니다.)
For example, lane Borrowed would result in true because 
there is exactly three characters between a and B 
(예를들어, lane Borrowed 문자열은 a 와 B 사이가 정확히 3글자 떨어져 있으므로 true 를 반환하게 됩니다.)
You should consider about space and capital character. (문자 사이의 공백도 한글자로 취급하며, 
대문자 A와 B도 소문자와 동일하게 생각해주셔야합니다.)
Please Note: you have to take care of undefined input case 
(노트: undefined 를 매개변수로 넣는 케이스도 고려하셔야 합니다.)
*/

// 1st solution
// It's not perfect since findIndex only catches the first element that satisfies the condition

function ABCheck(str) {
  str = str.toLowerCase();
  const aIndex = str.split('').findIndex(cur => cur === 'a');
  const bIndex = str.split('').findIndex(cur => cur === 'b');

  if(Math.abs(aIndex - bIndex) === 4) {
    return true;
  } else {
    return false;
  }
}

ABCheck('lane Borrowed');

// 2nd My

function ABCheck(str) {
  // loop the str and make 2 arrays
  // 1 containing 'a' indexes
  // the other containing 'b' indexes
  // loop those 2 arrays and return true
  // if the Math.abs of the indexes is 4
  if(str === undefined) return false;

  let count = 0;
  let aIndex = [];
  let bIndex = [];

  str.toLowerCase().split('').forEach((cur, i) => {
    if(cur === 'a') aIndex.push(i);
    else if(cur === 'b') bIndex.push(i);
  });

  console.log(aIndex);
  console.log(bIndex);

  for(let i = 0; i < aIndex.length; i++) {
    for(let j = 0; j < bIndex.length; j++) {
      if(Math.abs(aIndex[i] - bIndex[j]) === 4) {
        count++;
      }
    }
  }

  if(count > 0) {
    return true;
  }else {
    return false;
  }
}

// Model

function ABCheck(str) {
  if(str === undefined) {
    return false;
  }

  str = str.toLowerCase();

  for (let i = 0; i < str.length; i += 1) {
    if ((str[i] === 'a' && str[i + 4] === 'b') || (str[i] === 'b' && str[i + 4] === 'a')) {
      return true;
    }
  }
  
  return false;
}

/*
Given a positive integer num, 
return the sum of all odd Fibonacci numbers that are less than or equal to num.
The first two numbers in the Fibonacci sequence are 1 and 1. 
Every additional number in the sequence is the sum of the two previous numbers. 
The first six numbers of the Fibonacci sequence are 1, 1, 2, 3, 5 and 8.
For example, sumFibs(10) should return 10 because all odd Fibonacci numbers less than or equal to 10 are 1, 1, 3, and 5.
*/

// My 
function sumFibs(num) {
  // num 이하의 피보나치 수열 배열을 만듧
  // 그 배열에서 홀수 만 더해서 리턴
  let result = 0;
  let fibs = [1, 1];
  for(let i = 2; i <= num; i++) {
      fibs.push(fibs[i-1] + fibs[i-2]);
    }

  fibs.forEach(cur => {
      if(cur <= num && cur % 2 != 0) {
          result += cur;
      }
  })
  
  return result;
}

/*
Sum all the prime numbers up to and including the provided number.
A prime number is defined as a number greater than one and having only two divisors, 
one and itself. For example, 2 is a prime number because it's only divisible by one and two.
The provided number may not be a prime.
*/

// My

function sumPrimes(num) {
  let result = 0;

  function checkPrime(n) {
      if(n < 2) {
          return false;
      }
      for(let i = 2; i < n; i++) {
          if(n % i === 0) return false
      }
      return true;
  }

  for(let j = 2; j <= num; j++) {
      if(j <= num && checkPrime(j) === true) {
          result += j;
      }
  }

  return result;

}

/*
Find the smallest common multiple of the provided parameters 
that can be evenly divided by both, 
as well as by all sequential numbers in the range between these parameters.
The range will be an array of two numbers that will not necessarily be in numerical order.
For example, if given 1 and 3, find the smallest common multiple of both 1 and 3 that is also
evenly divisible by all numbers between 1 and 3. The answer here would be 6.
*/
// Model solutions are so fk hard

// My

function smallestCommons(arr) {
  arr.sort((a, b) => a - b);
  const minNum = arr[0];
  const maxNum = arr[1];
  const lcm = (minNum * maxNum) / gcd(minNum, maxNum);
  let result = lcm; 

  // 최대공약수

  function gcd(minNum, maxNum){
      return (minNum % maxNum) === 0 ? maxNum : gcd(maxNum, minNum % maxNum);
  }

 
  for(let i = maxNum - 1; i > minNum; i--) {
      if(gcd(i, result) === 1) {
          result *= i;
      }else {
          result *= i / gcd(i, result);
      }
  }    
  
  
return result;
}

/*
Recursion
- Zero is even
- One is odd
- For any other number N, its evenness is the same as N - 2
*/

// My 

function isEven(num) {
  if(num === 0) {
      return "even";
  }else if(num === 1){
      return "odd";
  }else {
      return isEven(num - 2);
  }
}


