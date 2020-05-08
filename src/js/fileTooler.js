function file2Base64(file){
    return new Promise(resolve => {
        var reader = new FileReader();
        reader.onload = function(e){
            resolve(e.target.result);
        }
        reader.readAsDataURL(file);
    })
}

export default {
    file2Base64
}