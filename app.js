const { Observable } = require('rxjs/Observable');
// Creational imports
const { of } = require('rxjs/observable/of');
const { fromEvent } = require('rxjs/observable/fromEvent');
const { empty } = require('rxjs/observable/empty');
const { fromPromise } = require('rxjs/observable/fromPromise');
const { from } = require('rxjs/observable/from');
const { range } = require('rxjs/observable/range');
const { interval } = require('rxjs/observable/interval');
const { _throw } = require('rxjs/observable/throw');
const { timer } = require('rxjs/observable/timer');
// Operators
// Combination
const { concat } = require('rxjs/observable/concat');
const { race } = require('rxjs/observable/race');
// Transformation
const {
  mapTo, pairwise, take,
  startWith, scan, merge,
  pipe, skip, first,
  last, throttle, zip,
  forkJoin } = require('rxjs/operators');

// non rxjs things
const readline = require('readline');

// Helper subscriber
const subscribeObj = {
  next: next => console.log(next),
  error: error => console.log(error),
  complete: () => console.log('Completed')
};

// WAYS TO CREATE OBSERVABLE

/* 1. create - create with given subscribe function */
// const observableUsingCreate = Observable.create((subscriber) => {
//   // can return a value here
//   subscriber.next(10);
//   // or throw an error
//   subscriber.error('Error!');
//   // or finally complete
//   subscriber.complete();
// });
//
// observableUsingCreate.subscribe(subscribeObj);

/* 2. of - from array of values. Could be any type. */
// const observableUsingOf = of(
//   1,
//   { id: 1, name: 'Name'},
//   ["String", 1, {hello: 'hello'}]
// );
//
// observableUsingOf.subscribe(subscribeObj)

/* 3. fromEvent - whenever something produces some sort of event.
Most naive example - button click, but could be anything which produces events */
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
//   terminal: false
// });
//
// fromEvent(rl, 'line').subscribe(subscribeObj);

/* 4. empty - just wrapper that returns nothing. Usefull when
after some actions you want to return nothing. */
// empty().subscribe(subscribeFun);

/* 5. fromPromise - simply as it is - create from Promise. */
// const myPromise = willReject => {
//   return new Promise((resolve, reject) => {
//     if (willReject) {
//       reject('Rejected!');
//     }
//     resolve('Resolved!');
//   });
// };
//
// fromPromise(myPromise(true)).subscribe(subscribeObj);

/* 6. from - turn an array, promise, or iterable into an observable. */
// from([1,2,3,4]).subscribe(subscribeObj)

/* 7. range - simply from range of numbers not strings/not objects so on. */
// range(1,10).subscribe(subscribeObj)

/* 8. interval - emits incremental numbers periodically in time. 0...1...2 som on */
// interval(1500).subscribe(subscribeObj)

/* 9. -throw - just emits an error on subscription
Could be error of any type */
// _throw('This is an error').subscribe(subscribeObj)

/* 10. timer - like interval but has second argument. When
don't provide second argument just emits 0 after period(first argument)
When provide, then after initial delay(first argument) emits
incremental numbers periodically with delay of (second argument). */
// timer(2000, 1000).subscribe(subscribeObj);

// WAYS TO COMBINE OBSERVABLES

/* 1. concat used to subscribe to few observables in order they were
declared in this function. If first doesn't complete other won't produce values. */
// const sourceOne = of(1, 2, 3);
// const sourceTwo = of(4, 5, 6);
//
// const example = concat(sourceOne, sourceTwo);
// const subscribe = example.subscribe(val => console.log(val));

/* 2. race -- observable which emits value first wins race.
If error is thrown firstly, none of observables wins.*/
// race(
//   interval(1000).pipe(mapTo('1s wins')),
//   interval(1500),
//   interval(2000)
// ).subscribe(subscribeObj);

/* 3. pairwise - emits values as array of 2 - previous and next */
// interval(1000)
//   .pipe(pairwise(), take(5))
//   .subscribe(console.log);

/* 4. startWith - begin emition with specified value/set of values */
//emit ('World!', 'Goodbye', 'World!')
// const source = of('World!', 'Goodbye', 'World!');
// //start with 'Hello', concat current string to previous
// const example = source.pipe(
//   startWith('Hello'),
//   scan((acc, curr) => `${acc} ${curr}`)
// );
// //output: -3, -2, -1, 0, 1, 2....
// const subscribe = example.subscribe(val => console.log(val));

/* 5. merge - combines few observables and don't cares about order in which values are produced */
// interval(1000).pipe(
//   merge(interval(2000)),
//   merge(interval(1500))).subscribe(subscribeObj);

/* 6. */

// WAYS TO FILTER OBSERVABLES

/* 1. take - you interested only in certain number of emmission of values. */
// interval(500).pipe(take(5)).subscribe(subscribeObj)

/* 2. skip - you interested only in certain number of emmission of values after n. So
you skip first n values. */
// interval(500).pipe(skip(5)).subscribe(subscribeObj)

/* 3. first / last */
// interval(1000).pipe(first(num => num === 2)).subscribe(subscribeObj)
// from([1,2,3,4,5]).pipe(last(
//     v => v > 4,
//     v => `The highest emitted number was ${v}`
// )).subscribe(subscribeObj)

/* 4. throttle - wait for 2 second and then emit latest value of those which were emmited. */
// const source = interval(1000);
// //throttle for 2 seconds, emit latest value
// const example = source.pipe(throttle(val => timer(2000))).subscribe(subscribeObj);

/* 5. zip - if 2 observables have same ammount of value it combines them like pairwise [1,1,2,2,3,3] into single array */
// const yin   = of('peanut butter', 'wine','rainbows')
// const yang  = of('jelly', 'cheese', 'unicorns')
//
// yin.pipe(zip(yang)).subscribe(subscribeObj)

/* 6. forkJoin - */
const yin   = of('peanut butter', 'wine','rainbows')
const yang  = of('jelly', 'cheese', 'unicorns')

yin.pipe(forkJoin(yang)).subscribe(subscribeObj)
