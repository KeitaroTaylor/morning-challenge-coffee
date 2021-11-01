var trash = document.getElementsByClassName("fa-trash")
var completed = document.getElementsByClassName("fa-completed")



Array.from(trash).forEach(function(element) {
    element.addEventListener('click', function(){
        const size = this.parentNode.parentNode.childNodes[1].childNodes[1].innerText
        const order = this.parentNode.parentNode.childNodes[1].childNodes[3].innerText
        let name
        if (this.parentNode.parentNode.childNodes[1].childNodes[5].innerText !== 'with') {
            name = this.parentNode.parentNode.childNodes[1].childNodes[7].innerText
        } else {
            name = this.parentNode.parentNode.childNodes[1].childNodes[11].innerText
        }
        fetch('orders', {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'size': size,
                'order': order,
                'name': name,
            })
        }).then(function (response) {
            window.location.reload()
        })
    });
});

Array.from(completed).forEach(function(element) {
    element.addEventListener('click', function() {
        const size = this.parentNode.parentNode.childNodes[1].childNodes[1].innerText
        const order = this.parentNode.parentNode.childNodes[1].childNodes[3].innerText
        let name
        if (this.parentNode.parentNode.childNodes[1].childNodes[5].innerText !== 'with') {
            const forWord = this.parentNode.parentNode.childNodes[1].childNodes[5].innerText
            name = this.parentNode.parentNode.childNodes[1].childNodes[7].innerText
            var msg = new SpeechSynthesisUtterance();
            msg.text = size + order + forWord + name;
            window.speechSynthesis.speak(msg);
        } else {
            const withWord = this.parentNode.parentNode.childNodes[1].childNodes[5].innerText
            const extra = this.parentNode.parentNode.childNodes[1].childNodes[7].innerText
            const forWord = this.parentNode.parentNode.childNodes[1].childNodes[9].innerText
            name = this.parentNode.parentNode.childNodes[1].childNodes[11].innerText
            var msg = new SpeechSynthesisUtterance();
            msg.text = size + order + withWord + extra + forWord + name;
            window.speechSynthesis.speak(msg);
        }
        fetch('completed', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'size': size,
                'order': order,
                'name': name,
            })
        }).then(function (response) {
            window.location.reload()
        })
    })
})