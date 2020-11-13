class Page{
    constructor(){
        this.body = document.querySelector(".wrapper");
        this.shadowSwitch()        
        this.ShowOnlyPage("ladning-page");
        this.body.addEventListener("mousemove", this.shadow);

        this.changePage();
        this.count = 0; 
    }
    
    //Bestämmer vilken sida som ska visas
    ShowOnlyPage(page){
        const pages = document.querySelectorAll(".pages")
        for(let current of pages){
            if(current.getAttribute("id") != page){
                current.classList.add("hidden")
            }
            
        }
    }

    //stänger av och på skuggfunktionen
    shadowSwitch(){
        
        const that = this
        let clicks = 0;
        document.querySelector(".fa-cog").addEventListener("click", function(e){
            ++clicks
            if(clicks %2 != 0){            
                that.body.removeEventListener("mousemove", that.shadow);
            }
            else{
                that.body.addEventListener("mousemove", that.shadow);

            }
            
        })
    }

    //Skugga följer muspekaren
    shadow(e){
        const body = document.querySelector(".wrapper")
        const firstname = document.querySelector(".content-ladning-page-fname")
        const lastname = document.querySelector(".content-ladning-page-lname")
        const stretch =  30; 
         
        //Hämtar måtten på skärmen
        const {offsetWidth: width, offsetheight: height} = body

        //Hämtar kordinaterna för muspekarn
        let {offsetX: x, offsetY: y} = e; 

        //Ser till så att kordinaterna gäller även när man drar över en ny div
        if(this !== e.target){
            x = x + e.target.offsetLeft;
            y = y + e.target.offsetTop; 
        };
        
        //Omvanldar x och y värderna till + och minus värden ex +100 -100
        const xStretch = Math.round((x /width * stretch) - (stretch / 2)); 
        const yStretch = Math.round((y /width * stretch) - (stretch / 2)); 
        
        //Ger skuggan nya värden 
        firstname.style.textShadow=`${xStretch}px ${yStretch}px 9px rgba(0, 0, 0, 0.15)`; 
        lastname.style.textShadow=`${xStretch}px ${yStretch}px 9px rgba(0, 0, 0, 0.15)`;    

    }

    //Byter mellan sidorna
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
                //Första sidbytet (från landnings sidan)
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