const displayArg = ({ name, required }) => (required === true ? '[' : '<') + name + (required === true ? ']' : '>')

export { displayArg }