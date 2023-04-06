export  function validate(dog) {
    const errors = {};
    if (!dog.name) {
        errors.name = 'Dogs require a name';
    }
    if (dog.name.length > 15){
        errors.name = 'The name is too long';
    }

    if (!dog.heightMin || !dog.heightMax){
        errors.height = 'Enter a minimum value and a maximum value (there must be a difference at least 15cm)';
    }
    if ((Number(dog.heightMax) - Number(dog.heightMin)) < 15) {
        errors.height = 'The height difference between Min and Max should be at least 15cm';
    }
    if (Number(dog.heightMin) < 20 || Number(dog.heightMax) < 30) {
        errors.height = 'What is this, a flea? (minimum 20)';
    }
    if(dog.heightMin <= 0 || dog.heightMax <= 0){
        errors.height = 'Che, You cannot use negative values'
    }
    if (Number(dog.heightMin) >= Number(dog.heightMax)) {
        errors.height = 'Minimum value cannot be equal or grater than maximum value';
    }

    if (!dog.weightMin || !dog.weightMax){
        errors.weight = 'Enter a minimum value and a maximum value (there must be a difference of at least 3kg)';
    }
    if ((Number(dog.weightMax) - Number(dog.weightMin)) < 3) {
        errors.weight = 'The weight difference between Min and Max should be at least 3kg';
    }
    if(dog.weightMin <= 0 || dog.weightMax <= 0){
        errors.weight = 'Che, You cannot use negative values'
    }
    if(dog.weightMin < 2){
        errors.weight = '¡Feed him more, Capo! (minimo 3)';
    }
    if (dog.weightMax > 50) {
        errors.weight = 'Put it on a diet, Master! (maximum 50)'
    }
    if (Number(dog.weightMin) >= Number(dog.weightMax)) {
        errors.weight = 'Minimum value cannot be equal or grater than maximum value';
    }
    if (Number(dog.weight) <= -1 || Number(dog.weightMax) <= -1) {
        errors.weight = 'Che, You cannot use negative values'
    }

    if (!dog.life_spanMin || !dog.life_spanMax){
        errors.life_span = 'Enter a minimum value and a maximum value (there must be a difference at least 2 years)';
    }
    if ((Number(dog.life_spanMax) - Number(dog.life_spanMin)) < 2) {
        errors.life_span = 'The life range between Min and Max should be at least 2 years';
    }
    if(dog.life_spanMax <= 0 || dog.life_spanMin <= 0){
        errors.life_span = 'Do you want a zombie dog?';
    }
    if (dog.life_spanMax > 20) {
        errors.life_span = 'El maximo de vida es de 20 años';
    }
    if (dog.life_spanMin < 6) {
        errors.life_span = 'How cruel it can be to put so little life (minimum 6)'
    }
    if (Number(dog.life_spanMin) >= Number(dog.life_spanMax)) {
        errors.life_span = 'Minimum value cannot be equal or grater than maximum value';
    }

    if (!dog.temperament.length) {
        errors.temperament = 'Select at least one temperament for your dog';
    }

    return errors;
}