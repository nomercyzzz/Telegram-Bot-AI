const body = document.querySelector('body');
body.style.opacity = '0'; 

setTimeout(() => {
    body.style.opacity = '1';
}, 100);

const login_click = document.querySelectorAll('.login-click');
const registration_click = document.querySelectorAll('.registration-click');
const login_form = document.querySelector('.container-login');
const registration_form = document.querySelector('.container-registration');

registration_form.style.display = "none";
registration_form.style.opacity = "0";
registration_form.style.transform = "translateX(40%)";
login_form.style.display = "flex";
login_form.style.opacity = "1";
login_form.style.transform = "translateX(0)";

for (const log of login_click){
    log.style.color = "DarkGray";
}
for (const reg of registration_click){
    reg.style.color = "DimGray"; 
}

for (const btn of registration_click) {
    btn.addEventListener('click', () => {
        login_form.style.opacity = "0";
        login_form.style.transform = "translateX(-10%)";
        
        setTimeout(() => {
            login_form.style.display = "none";
            registration_form.style.display = "flex";

            setTimeout(() => {
                registration_form.style.opacity = "1";
                registration_form.style.transform = "translateX(0)";
            }, 50);
        }, 300);

        for (const log of login_click){
            log.style.color = "DimGray"; 
        }
        for (const reg of registration_click){
            reg.style.color = "DarkGray"; 
        }
    }); 
}

for (const btn of login_click) {
    btn.addEventListener('click', () => {

        registration_form.style.opacity = "0";
        registration_form.style.transform = "translateX(10%)";

        setTimeout(() => {
            registration_form.style.display = "none";
            login_form.style.display = "flex";
            
            setTimeout(() => {
                login_form.style.opacity = "1";
                login_form.style.transform = "translateX(0)";
            }, 50);
        }, 300);

        for (const log of login_click){
            log.style.color = "DarkGray"; 
        }
        for (const reg of registration_click){
            reg.style.color = "DimGray"; 
        }
    });
}




