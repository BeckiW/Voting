var web3 = new Web3(web3.currentProvider);

var abi = JSON.parse('[{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"}]')
var VotingContract = web3.eth.contract(abi);
// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
var contractInstance = VotingContract.at('0xD4304C12B282A3177E0ddb86C11473333717dD48');

var candidates = { "Chi": "candidate-1", "Victor": "candidate-2", "Hampus": "candidate-3" }

$(document).ready(function () {
  var candidateNames = Object.keys(candidates);
  for (var i = 0; i < candidateNames.length; i++) {
    let name = candidateNames[i];
    contractInstance.totalVotesFor.call(name, function (test, val) {
      $("#" + candidates[name]).html(val.c[0]);
    });
  }
});

function voteForCandidate() {
  candidateName = $("#candidate").val();

  contractInstance.voteForCandidate(candidateName, { from: web3.eth.accounts[0] }, function () {
    let div_id = candidates[candidateName];
    contractInstance.totalVotesFor.call(candidateName, function (error, result) {
      $("#" + div_id).html(result.c[0]);
    });
  });
}