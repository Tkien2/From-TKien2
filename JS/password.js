// Hash password skibidi tối thượng siêu cấp sigma =))))
function encryptPassword(password){
    let encryptedPassword = 39
    let salt = "YouMadeMyYears"
    let encryptedSalt = 1037
    const sugar = 39
    for (let i = 0; i<password.length; i++){
        encryptedPassword += (encryptedPassword^(password.charCodeAt(i)^sugar))^encryptedPassword
        encryptedPassword ^= sugar
    }
    for (let i = 0; i<salt.length; i++){
        encryptedSalt += encryptedPassword^((salt.charCodeAt(i)^sugar)^sugar)
        encryptedSalt ^= sugar
    }
    let encryptedPassword2 = (encryptedPassword^sugar)^(encryptedSalt^sugar)
    return btoa(encryptedPassword2)
}
export function encryptPassword2(password){
    return encryptPassword(btoa(encryptPassword(password)))
}