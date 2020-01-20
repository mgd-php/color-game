(function() {
    let currentNumber = 1;
    const colors = [
        'red', 'orangered', 'yellow', 'green', 'deepskyblue', 'mediumblue', 'blueviolet', 'peru', 'gray', 'black',
        'deeppink'
    ];
    const rightChoices = {
        0: 'black', 1: 'red', 2: 'mediumblue', 3: 'yellow', 4: 'green',
        5: 'deeppink', 6: 'orangered', 7: 'blueviolet', 8: 'peru', 9: 'gray'
    };

    const successSound = new Audio('audio/success.ogg');
    const failureSound = new Audio('audio/failure.ogg');
    let changing = false;

    const numberSpan = document.getElementById('number');
    const colorButtons = document.querySelectorAll('.color');

    colorButtons.forEach(function(button) {
        if (changing) {
            return;
        }
        button.addEventListener('click', function() {
            handleColorSelect(button.style.backgroundColor)
        });
    });

    const handleColorSelect = (color) => {
        if (color === getRightColorForNumber(currentNumber)) {
            successSound.play();
            numberSpan.style['color'] = color;
            changing = true;
            setTimeout(() => {
                currentNumber++;
                setNextQuest();
            }, 1000);
        } else {
            failureSound.play();
        }
    };

    const setNextQuest = () => {
        numberSpan.style['color'] = 'white';
        changeNumber(currentNumber);
        updateColours(getRightColorForNumber(currentNumber));
        changing = false;
    };

    const changeNumber = (number) => {
        numberSpan.innerText = number;
    };

    const updateColours = (color) => {
        let newColors = [color];
        while (newColors.length < 3) {
            const candidate = colors[Math.floor(Math.random()*colors.length)];
            if (newColors.indexOf(candidate) === -1) {
                newColors.push(candidate);
            }
        }

        newColors = shuffleArray(newColors);
        colorButtons.forEach((button, index) => {
            button.style['backgroundColor'] = newColors[index];
        })
    };

    const shuffleArray = (arr) => {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    };

    const getRightColorForNumber = (number) => {
        return rightChoices[number % 10];
    };

    setNextQuest();
})();
