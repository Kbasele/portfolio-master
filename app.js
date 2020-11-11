document.addEventListener("DOMContentLoaded", ()=>{
    new Page()

});

class Page{
    constructor(){
        this.body = document.querySelector(".wrapper");
        this.body.addEventListener("mousemove", this.shadow);
        this.ShowOnlyPage("ladning-page");
        this.changePage();
        this.count = 0; 
    }
    
    //Bestämmer vilken sida som ska visas
    ShowOnlyPage(page ){
        const pages = document.querySelectorAll(".pages")
        for(let current of pages){
            if(current.getAttribute("id") != page){
                current.classList.add("hidden")
            }
            
        }

    }

    //Skugga följer muspekaren
    shadow(e){
        const body = document.querySelector(".wrapper")
        const landingPage = document.querySelector(".content-ladning-page")
        const firstname = document.querySelector(".content-ladning-page-fname")
        const lastname = document.querySelector(".content-ladning-page-lname")
        const stretch =  10; 
        const projectCards = document.querySelectorAll(".project-card")
        const icon = document.querySelectorAll(".icon")
        

        const {offsetWidth: width, offsetheight: height} = body
        let {offsetX: x, offsetY: y} = e; 
    
        if(this !== e.target){
            x = x + e.target.offsetLeft;
            y = y + e.target.offsetTop; 
        };
    
        const xStretch = Math.round((x /width * stretch) - (stretch / 2)); 
        const yStretch = Math.round((y /width * stretch) - (stretch / 2)); 
        
        firstname.style.textShadow=`${xStretch}px ${yStretch}px 9px rgba(0, 0, 0, 0.15)`; 
        lastname.style.textShadow=`${xStretch}px ${yStretch}px 9px rgba(0, 0, 0, 0.15)`;    

    }

    //Byter sida
    changePage(){  
        const navbar = document.querySelectorAll(".wrapper-footer li")
        const firstname = document.querySelector(".content-ladning-page-fname")
        const lastname = document.querySelector(".content-ladning-page-lname")
        const landingPage = document.querySelector(".content-ladning-page")


        let count = 0; 
        for(let current of navbar){
            const pages = document.querySelectorAll(".pages")

            current.addEventListener("click", (e)=>{
                count++
                const that = this;
                //Första sidbytet
                if(count<2){
                    if(current.getAttribute("class") == "ladning-page"){
                        count = 0; 
                        
                    }
                    else{
                        console.log(current)
                        firstname.setAttribute("id", "firstPageAnimation");
                        lastname.setAttribute("id", "firstPageAnimation");
                        landingPage.setAttribute("id", "fadeoutPage")
                        
                        setTimeout(function(){
                            that.ShowOnlyPage(current);
                            for(const cur of pages){
                                if(cur.getAttribute("id") == current.getAttribute("class")){
                                    cur.classList.remove("hidden")
                                }
                            }
                        }, 1500)  
                    }
                }

                //Byter efter första bytet
                if(count>1){
                    console.log(current)
                    this.ShowOnlyPage(current);
                    for(const cur of pages){
                        if(cur.getAttribute("id") == current.getAttribute("class")){
                            cur.classList.remove("hidden")
                            cur.classList.remove("firstPageAnimation")
                        }
                    }       

                }
            })
        }
    }
}
