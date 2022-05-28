import { Contract, providers, utils } from "ethers";

const contractIsABI = (contract: Contract) => {
    // I cannot remember how to check if contract is equal to interface
    const hasName = Object.prototype.hasOwnProperty.call(contract, 'name');
    const hasSymbol = Object.prototype.hasOwnProperty.call(contract, 'symbol');
    const hasTotalSupply = Object.prototype.hasOwnProperty.call(contract, 'totalSupply');
    const hasDecimals = Object.prototype.hasOwnProperty.call(contract, 'decimals');
    const hasAllowance = Object.prototype.hasOwnProperty.call(contract, 'allowance');
    const hasApprove = Object.prototype.hasOwnProperty.call(contract, 'approve');
    const hasBalanceOf = Object.prototype.hasOwnProperty.call(contract, 'balanceOf');
    const hasdecreaseAllowance = Object.prototype.hasOwnProperty.call(contract, 'decreaseAllowance');
    const hasincreaseAllowance = Object.prototype.hasOwnProperty.call(contract, 'increaseAllowance');
    const hasmint = Object.prototype.hasOwnProperty.call(contract, 'mint');
    const hastransfer = Object.prototype.hasOwnProperty.call(contract, 'transfer');
    const hastransferFrom = Object.prototype.hasOwnProperty.call(contract, 'transferFrom');

    return  hasName && hasSymbol && hasTotalSupply && hasDecimals &&
            hasAllowance && hasApprove && hasBalanceOf && hasdecreaseAllowance &&
            hasincreaseAllowance && hasmint && hastransfer && hastransferFrom;
}

const contractIsValid = async (contractAddress: string, abi: utils.Interface, provider: providers.InfuraProvider): Promise<string> => {
    const noCode = await provider.getCode(contractAddress) === '0x';
    if (noCode){
        return 'There is no code at that address';
    }
    const contract = new Contract(contractAddress, abi, provider);
    const noABI = ! contractIsABI(contract);
    if(noABI){
        return 'The contract is not a ERC20 token';
    }
    return '';

}

export { contractIsValid }