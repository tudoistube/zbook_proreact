//...167~p.
/*
...167p.콜백에 스로틀 적용.
카드를 다른 카드 위로 드래그하면 DnD Context 인 KanbanBoardContainer 컴포넌트의
cardCallbacks 중 updatePosition 콜백이 호출되며, 다른 리스트 위로 드래그하면
DnD Context 인 KanbanBoardContainer 컴포넌트의 cardCallbacks 중 updateStatus 콜백이
호출됨.

그러나, 초당 수십번 콜백을 호출하면 성능이 저하될 수 있어서 함수 호출 횟수를 제한하는
스토틀 함수를 구현함.
스로틀을 적용하려는 원래 함수(function)와 대기 시간(wait) 의 두 매개변수를 받고
반복적으로 호출되면 wait 밀리초당 최대 한번만 원래 함수를 호출하는 스로틀 적용 버전의
함수를 반환함.
스로틀 함수는 호출 인수가 변경되면 지능적으로 즉시 원래 함수를 호출함.
*/
export const throttle = (func, wait) => {
  let context, args, prevArgs, argsChanged, result;
  let previous = 0;

  return function() {
    let now, remaining;
    if(wait){
      now = Date.now();
      remaining = wait - (now - previous);
    }

    context = this;
    args = arguments;
    argsChanged = JSON.stringify(args) != JSON.stringify(prevArgs);
    //prevArgs = {...args}; //...167p. 책에는 이렇게 되어 있으나 오류가 발생함.
    //prevArgs = args; //...Okay, it worked.
    prevArgs = Object.assign({}, args);

    if (argsChanged || wait && (remaining <= 0 || remaining > wait)) {
      if(wait){
        previous = now;
      }
      result = func.apply(context, args);
      context = args = null;
    }
    return result;
  };
};
