/* 공통 함수 관련 로직 */
// 주어진 에러메시지를, 정해진 Element에 표시하는 함수
function show_error_message(input_element, error_id, error_message) {
    input_element.classList.add("error");
    const error_element = document.getElementById(error_id);
    if (error_element) {
        error_element.textContent = error_message;
        error_element.classList.add("show");
    }
}

// 표시된 에러메시지를, 정해진 Element로부터 제거하는 함수
function remove_error_message(input_element, error_id) {
    input_element.classList.remove("error");
    const error_element = document.getElementById(error_id);
    if (error_element) {
        error_element.textContent = "";
        error_element.classList.remove("show");
    }
}


/* 이메일 입력 확인 로직 */
const email_input = document.getElementById("email");

// EventListener 등록
if (email_input) {
    email_input.addEventListener("focusout", email_focusout);
    email_input.addEventListener("focus", email_focus);
}

// 에러 메시지를 제거하는 함수(remove_error_message) 호출
function email_focus(event){
    remove_error_message(email_input, 'email-error');
}

// 에러 메시지를 출력하는 함수(show_error_message) 호출
function email_focusout(event) {
    const email_input_value = email_input.value;
    // 요구사항) 이메일 input에서 focus out 할 때, 값이 없을 경우 input에 빨강색 테두리와 아래에 “이메일을 입력해주세요.” 빨강색 에러 메세지를 보입니다.
    if (!email_input_value){
        show_error_message(email_input, 'email-error', "이메일을 입력해주세요.");
        return;
    }

    // 요구사항) 이메일 input에서 focus out 할 때, 이메일 형식에 맞지 않는 경우 input에 빨강색 테두리와 아래에 “잘못된 이메일 형식입니다” 빨강색 에러 메세지를 보입니다.
    const regExp = new RegExp("^[^@]+@[^@]+\\.[^@]+$");
    if (email_input_value && !email_input_value.match(regExp)){
        show_error_message(email_input, 'email-error', '잘못된 이메일 형식입니다');
        return;
    }
    
}

/* 비밀번호 입력 확인 로직 */
const password_input = document.getElementById("password");

// EventListener 등록
if (password_input){
    password_input.addEventListener("focusout", password_focusout);
    password_input.addEventListener("focus", password_focus);
}

// 에러 메시지를 제거하는 함수(remove_error_message) 호출
function password_focus(event){
    remove_error_message(password_input, 'password-error');
}

// 에러 메시지를 출력하는 함수(show_error_message) 호출
function password_focusout(event){
    const password_input_value = password_input.value;

    // 요구사항) 비밀번호 input에서 focus out 할 때, 값이 없을 경우 아래에 “비밀번호를 입력해주세요.” 에러 메세지를 보입니다.
    if (!password_input_value){
        show_error_message(password_input, 'password-error', '비밀번호를 입력해주세요.');
        return;
    }

    // 요구사항) 비밀번호 input에서 focus out 할 때, 값이 8자 미만일 경우 아래에 “비밀번호를 8자 이상 입력해주세요.” 에러 메세지를 보입니다.
    if (password_input_value.length < 8){
        show_error_message(password_input, 'password-error', '비밀번호를 8자 이상 입력해주세요.');
        return;
    }
}