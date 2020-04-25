const getProcessArg = name => {
  const arg = process.argv.find(a => a.includes('ROUNDS'));
  return (arg && arg.split('=')[1]) || null
}

module.exports = {
  getProcessArg
}
