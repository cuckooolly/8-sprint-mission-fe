/*
질문) 여러 개의 html 파일에 스크립트를 적용할 경우에, Conflict가 발생합니다. 
예를 들어, login.html과 signup.html에 login-button이라는 ID를 가진 버튼과 signup-button이라는 ID를 가진 버튼이 있을 때
두 html 코드에 이 스크립트를 적용하면, "login_btn.addEventListener('click', handleLogin);"에서 에러가 발생하여 더이상 아래에 있는 코드가 실행되지 않는 현상이 있습니다.
이러한 현상을 아래에 처리한 if문을 처리한 방법이외에, 다른 방법들이 있을지 궁금합니다.
*/

const USER_DATA = [
    { email: '1@1', password: "1" }, // 테스트용 데이터
    { email: 'codeit1@codeit.com', password: "codeit101!" },
    { email: 'codeit2@codeit.com', password: "codeit202!" },
    { email: 'codeit3@codeit.com', password: "codeit303!" },
    { email: 'codeit4@codeit.com', password: "codeit404!" },
    { email: 'codeit5@codeit.com', password: "codeit505!" },
    { email: 'codeit6@codeit.com', password: "codeit606!" },
];

// login.html의 로그인 버튼의 Click 이벤트 핸들러
const login_btn = document.getElementById('login-button');
if (login_btn) { // 로그인 버튼이 존재하는 경우에만, 이벤트 리스너 작동
    login_btn.addEventListener('click', handleLogin);
}

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const attempt_data = USER_DATA.find(user => user.email === email && user.password === password);
    if (attempt_data) {
        window.open('items.html', '_self');
    } else {
        alert('비밀번호가 일치하지 않습니다.');
    }
}

// signup.html의 회원가입 버튼의 Click 이벤트 핸들러
const signup_btn = document.getElementById('signup-button');
if (signup_btn) { // 회원가입 버튼이 존재하는 경우에만, 이벤트 리스너 작동
    signup_btn.addEventListener('click', handleSignup);
}

function handleSignup(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (USER_DATA.find(user => user.email === email)) {
        alert('사용 중인 이메일입니다.');
        return;
    } else {
        window.open('login.html', '_self');
    }
}