import { useState, useEffect, useCallback, useRef } from 'react'

export function useDebounce(fn, delay = 30, dep = [], isCancel = false) {
  const { current } = useRef<any>({ fn, timer: null })
  useEffect(() => {
    current.fn = fn
  }, [fn])
  const cancel = () => {
    clearTimeout(current.timer)
    current.timer = null
  }
  const cb = useCallback(function f(...args) {
    if (current.timer) {
      clearTimeout(current.timer)
    }
    current.timer = setTimeout(() => {
      current.fn.call(this, ...args)
    }, delay)
  }, dep)
  return isCancel ? cancel : cb
}

// export const useDebounce = (fn, ms = 30, deps = []) => {
//   let timeout: any = useRef()
//   useEffect(() => {
//     if (timeout.current) clearTimeout(timeout.current)
//     timeout.current = setTimeout(() => {
//       fn()
//     }, ms)
//   }, deps)

//   const cancel = () => {
//     clearTimeout(timeout.current)
//     timeout = null
//   }

//   return [cancel]
// }

// 节流
export function useThrottle(fn, delay, dep = []) {
  const { current } = useRef<any>({ fn, timer: null })
  useEffect(() => {
    current.fn = fn
  }, [fn])
  return useCallback(function f(...args) {
    if (!current.timer) {
      current.timer = setTimeout(() => {
        delete current.timer
      }, delay)
      current.fn.call(this, ...args)
    }
  }, dep)
}

// export const useThrottle = (fn, ms = 30, deps = []) => {
//   const previous = useRef(0)
//   const [time, setTime] = useState(ms)
//   useEffect(() => {
//     const now = Date.now()
//     if (now - previous.current > time) {
//       fn()
//       previous.current = now
//     }
//   }, deps)

//   const cancel = () => {
//     setTime(0)
//   }

//   return [cancel]
// }

export const useTitle = title => {
  useEffect(() => {
    document.title = title
  }, [])

  return
}

/*
 * 以上代码可以发现，我们useUpdate钩子返回了一个函数，该函数就是用来强制更新用的。使用方法如下：
  const Home = (props) => {
    // ...
    const update = useUpdate()
    return <div>
      {Date.now()}
      <div><button onClick={update}>update</button></div>
    </div>
  }
 */
export const useUpdate = () => {
  const [, setFlag] = useState<number>()
  const update = () => {
    setFlag(Date.now())
  }

  return update
}

/*
由以上代码可知，我们在钩子函数里需要传入一个元素的引用，这个我们可以在函数组件中采用ref和useRef来获取到，钩子返回了滚动的x，y值，即滚动的左位移和顶部位移，具体使用如下：
import React, { useRef } from 'react'

import { useScroll } from 'hooks'
const Home = (props) => {
  const scrollRef = useRef(null)
  const [x, y] = useScroll(scrollRef)

  return <div>
      <div ref={scrollRef}>
        <div className="innerBox"></div>
      </div>
      <div>{ x }, { y }</div>
    </div>
}
*/
export const useScroll = scrollRef => {
  const [pos, setPos] = useState([0, 0])

  useEffect(() => {
    function handleScroll() {
      setPos([scrollRef.current.scrollLeft, scrollRef.current.scrollTop])
    }
    scrollRef.current.addEventListener('scroll', handleScroll, false)
    return () => {
      scrollRef.current.removeEventListener('scroll', handleScroll, false)
    }
  }, [])

  return pos
}

/*
平时在实现需求时，经常需要保存上一次渲染时 state 的值，so 这个 hook 就是用来保存上一次渲染状态的。如下所示为实现逻辑，主要用到 useRef.current 来存放变量。
usePrevious 的使用实例如下所示，当点击按钮使 count 增加时，previous 会保留 count 的上一个值。
import React, { useState } from 'react';
import usePrevious from './usePrevious';

const MyPage = () => {
  const [count, setCount] = useState(0);
  const previous = usePrevious(count);

  return (
    <div >
      <div>新值:{count}</div>
      <div>旧值:{previous}</div>
      <button type="button" onClick={() => { setCount(count + 1); }}>
        增加
      </button>
    </div>
  );
};

export default MyPage;
*/
export function usePrevious<T>(state: T): T | undefined {
  const prevRef = useRef<T>()
  const curRef = useRef<T>()

  prevRef.current = curRef.current
  curRef.current = state

  return prevRef.current
}

/*
如下所示，我们只需要告诉 useTimeout 多少毫秒去调用哪个方法，不需要再去考虑移除定时器的事情了
import React, { useState } from 'react';
import useTimeout from './useTimeout';

const MyPage = () => {
  const [count, setCount] = useState(0);

  useTimeout(() => {
    setCount(count => count + 1);
  }, 3000);

  return (
    <div >
      <button type="button">
        增加 {count}
      </button>
    </div>
  );
};

export default MyPage;
*/
export function useTimeout(fn: () => void, delay: number) {
  useEffect(() => {
    const timer = setTimeout(() => {
      fn()
    }, delay)
    return () => {
      clearTimeout(timer) // 移除定时器
    }
  }, [delay])
}
