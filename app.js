
// if (typeof web3 !== 'undefined') {
//   web3 = new Web3(web3.currentProvider);
// } else {
  // set the provider you want from Web3.providers
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));

var contract = new Contract()
console.log(contract)

//carrega saldos das contas
refreshAllBalances()

//carrega o numero do total de moedas emitidas
totalSupply()

//registro a escuta do evento de transferência
registerEvents()

// acao de transferir de uma conta pra outra
$("#transfer").click(function() {
  var toAccount = $("#toAccount").val()
  var value = $("#value").val()
  contract.contract_instance.transfer(toAccount, value, {from: contract.owner ,gas: 210000}, function (error, result) {
    if (error)
      console.log(error)
  });
  
})

function Contract() {
  this.contract_id = $("#contract").val()
  this.abi = JSON.parse('[{"constant":true,"inputs":[],"name":"supply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_owner","type":"address"},{"name":"_totalSupply","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"}]')
  this.contract_instance = web3.eth.contract(this.abi).at(this.contract_id)
  this.symbol = this.contract_instance.symbol()
  this.name = this.contract_instance.name()
  this.owner = web3.eth.accounts[0]
}

function registerEvents() {
  // Escutar um evento
  var evento = contract.contract_instance.Transfer({}, {});
  // Escutando evento
  evento.watch(function(error, event){
    if (!error)
      console.log(event);
      refreshAllBalances()
  });
}


function totalSupply() {
  var totalSupply = contract.contract_instance.totalSupply(contract.owner);
  $("#totalSupply").append(contract.symbol + " " + totalSupply.c[0])
}

function refreshAllBalances() {
  web3.eth.accounts.forEach(balanceInBrl)  
}


function balanceInBrl(item, index) { 
  var balanceInBrl = contract.contract_instance.balanceOf(item);
  $("#account"+index +" .panel-heading .panel-title").html(item)
  $("#account"+index +" .panel-body").html(contract.symbol + " " + balanceInBrl.c[0])
}
