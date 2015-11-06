export default function mapObj (fun, obj) {
  return Object.getOwnPropertyNames(obj).map((prop) => {
    const val = obj[prop]
    return fun(val, prop)
  })
}
