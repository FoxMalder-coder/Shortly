import iconDelete from '../images/icon-delete.svg';

export const linkHtml = (input, result, index) => {
    const screenSize = window.innerWidth;

    //Putting three dots in case that input link is too long
    //and making some adjustements for small phones
    const shortenInput = (input, isSmallScreen)=>{
        if(isSmallScreen) {
            return (input.length > 25 ? input.slice(0,22).concat('...') : input);
        }else {
            return (input.length > 30 ? input.slice(0,27).concat('...') : input);
        }
    }

    return (`           
            <div class="links-content" data-shortlink="${result}" data-index="${index}">
                <a href="${input}" target="_blank" title="${input}" class="link link__input">
                    ${shortenInput(input, screenSize <= 400)}
                </a>
                <a href="${result}" class="link link__shorten" target="_blank">${result}</a>
                <a href="#" class="btn link__btn">Copy</a>  
                <button class="link__delete-btn" aria-label="delete link">
                    <svg>
                        <use href="${iconDelete}#icon-delete"></use>
                    </svg>                    
                </button>    
            </div>                                                   
    `)
};

export const linkContainer =(link,i) =>{
    return(
         `
             <div class="links-container intro-hide">
                 ${linkHtml(link.originalLink, link.shortLink, i)}
             </div>
         `
    )         
}


export const spinner = `
    <div class="links-container loader-1">        
            <div class="loader">
                <div class="loader-ball-1"></div>
                <div class="loader-ball-2"></div>
            </div>   
    </div>    
`
