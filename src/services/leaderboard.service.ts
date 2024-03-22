import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})

export class leaderboardService{
    get(item:string){
       return localStorage.getItem(item)
    }
    compare(score: number){
        if(localStorage.getItem('score1') === null || localStorage.getItem('score2') === null || localStorage.getItem('score3') === null){
            return true
        }

        if(score > Number(localStorage.getItem('score3')) || score > Number(localStorage.getItem('score2')) || score > Number(localStorage.getItem('score1')) ){
            return true
        }

        return false
    }

    add(score: number, name: string){
        if(localStorage.getItem('score1') === null){
            localStorage.setItem('score1', score.toString())
            localStorage.setItem('score1Name', name)

        }

        else if(localStorage.getItem('score2') === null){
            localStorage.setItem('score2', score.toString())
            localStorage.setItem('score2Name', name)
        }

        else if(localStorage.getItem('score3') === null){
            localStorage.setItem('score3', score.toString())
            localStorage.setItem('score3Name', name)
        }
        else{
            if(score > Number(localStorage.getItem('score1'))){
                
                console.log("here?")
                localStorage.setItem('score3', this.get('score2')!)
                console.log("or here?")
                localStorage.setItem('score3Name', this.get('score2Name')!)
                console.log("Maybe here")
                
    
                localStorage.setItem('score2', this.get('score1')!)
                localStorage.setItem('score2Name', this.get('score1Name')!)
                
                localStorage.setItem('score1', score.toString())
                localStorage.setItem('score1Name', name)
    
            }
    
            else if(score > Number(localStorage.getItem('score2'))){
                localStorage.setItem('score3', this.get('score2')!)
                localStorage.setItem('score3Name', this.get('score2Name')!)
    
                localStorage.setItem('score2', score.toString())
                localStorage.setItem('score2Name', name)
    
            }
    
            else if(score > Number(localStorage.getItem('score3'))){
                localStorage.setItem('score3', score.toString())
                localStorage.setItem('score3Name', name)
    
            }

        }

        

        
    }
}