window.onload = function () {
  // if (typeof web3 !== 'undefined') {
  //   web3 = new Web3(web3.currentProvider);
  // } else {
    // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));
  
  var enderecoContrato = "0x2c2b9c9a4a25e24b174f26114e8926a9f2128fe4";
  var abi = JSON.parse('[{"constant":true,"inputs":[],"name":"supply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_owner","type":"address"},{"name":"_totalSupply","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"}]')
  var contrato = web3.eth.contract(abi).at(enderecoContrato);
  var symbol = contrato.symbol()
  var name = contrato.name()

  refreshAllBalances()
  
  totalSupply()

  $("#transfer").click(function() {
    
    var toAccount = web3.eth.accounts[1]
    if ($("#toAccount").val()) {
      toAccount = $("#toAccount").val()
    }

    var value = $("#value").val()

    contrato.transfer(toAccount, value, {from: web3.eth.accounts[0] ,gas: 210000}, function (error, result) {
      if (!error)
        refreshAllBalances()
    });
    
  })

  function totalSupply() {
    var totalSupply = contrato.totalSupply(web3.eth.accounts[0]);
    $("#totalSupply").append(symbol + " " + totalSupply.c[0])
  }

  function refreshAllBalances() {
    web3.eth.accounts.forEach(balanceInBrl)  
  }
  

  function balanceInBrl(item, index) {
    
    var balanceInBrl = contrato.balanceOf(item);
    $("#account"+index +" .panel-heading .panel-title").html(item)
    $("#account"+index +" .panel-body").html(symbol + " " + balanceInBrl.c[0])
    
  }
}