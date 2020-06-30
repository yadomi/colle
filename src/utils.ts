export const reverse = a =>
  a.reduce((ary, e) => {
    ary.unshift(e)
    return ary
  }, [])
