export class VendingMachine {
    
    private internalBalance:number=0

    post(coin:number){
        this.internalBalance+=coin;
    }

    get balance(){
        return this.internalBalance
    }

    refund(){
        const change:number=this.internalBalance
        this.internalBalance=0
        return change


    }

}
