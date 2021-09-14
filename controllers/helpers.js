const removedAdded = (previous, current) => {
  const removed = previous.filter((a) => !current.includes(a))
  const added = current.filter((a) => !previous.includes(a))
  return [removed, added]
}

export { removedAdded }
