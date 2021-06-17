
let studentsApp = angular.module("studentsApp", []);
studentsApp.controller("studentsCtrl", function ($scope, $http) {

    let getStudents = function() {
        if( !localStorage.getItem('students') ) {  //Если в Local Storage еще нет сохраненных данных  
            $http.get('students.json') //Обращаемся к JSON-файлу и передаем его содержимое в $scope
            .then( (response) => {
                $scope.list = response.data;
                localStorage.students = JSON.stringify($scope.list);//Сохраняем данные из JSON-файла в Local Storage
            });
        } else { //Если есть - берем их из Local Storage
            let jsonParse = JSON.parse(localStorage.students);
            $scope.list = jsonParse;
        };
    };

    //Запускаем построение списка учеников
    getStudents();

    //Создаем объект ученика из данных, введенных пользовтелем
    $scope.addStudents = function (name, surName, avatar) {
        localStorage.setItem( 'students', JSON.stringify($scope.list) );
        $scope.list.push( {name: name, surName: surName, avatar: avatar} );
        
        //Перезаписываем Local Storage с новыми данными
        localStorage.students = JSON.stringify($scope.list);
    };

    //Ловим индекс элемента массива учеников и удаляем из массива элемент с этим индексом
    $scope.delStudents = function(item) {
        let areYouSure = confirm('Это очень способный ученик. Точно удалить?');
        if (areYouSure) {
        $scope.list.splice([item], 1);

        //Перезаписываем Local Storage с новыми данными
        localStorage.students = JSON.stringify($scope.list);
        };
    };

    //Удаляем список учеников из Local Strage и запускаем построение списка заново
    $scope.reloadStudents = function() {
        localStorage.removeItem("students");
        getStudents();
    };
});
