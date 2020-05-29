"use strict";
function getCloth(gender) {
    switch (gender.gender) {
        case 'male':
            console.log(gender.Malecloth);
            break;
        case 'female':
            console.log(gender.Femalecloth);
            break;
        default:
            break;
    }
}
