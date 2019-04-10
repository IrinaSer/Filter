# A Vue.js Filter

> A Vue.js project

## Описание задачи

```
Компонент “фильтр” состоит из инпутов для ввода данных, конпки Add condition,
и кнопок Apply и Clear filter

При клике на первый инпут появляется выпадашка с возможностью выбора поля
фильтрации
    ● Text field
    ● Number field

При выборе второго инпута появлятся выпадашка с возможностью выбора
операции фильтрации. Операция зависит от выбранного поля фильтрации.
Для Text field фильтра
    ● Containing
    ● Exactly matching
    ● Begins with
    ● Ends with
Для Number field фильтра
    ● Equal
    ● Greater than
    ● Less than

В последний инпут вводится значение фильтра. Для Text field фильтра это
произвольная строка, для Number field это число.

При изменении поля фильтрации с Text field на Number field или наоборот,
остальные инпуты (операция и значение фильтрации) сбрасываются на
дефолтные.

При клике на Add condition появляется новая строка с инпутами. Дефолтное
состояние новой строки фильтра - тип фильтра Text, операция Containing.
Максимальное количество строк - 10.

При нажатии кнопки Clear filter весь компонент скидывается в первоначальное
состояние.

При нажатии кнопки Apply на экран или в консоль браузера выводится
информация о текущем состоянии фильтра.

Пример:
Вывод:
{
 text: [
     { operation: 'containing', value: 'some text' },
     { operation: 'begins with', value: 'word' },
 ],
 number: [
    { operation: 'greater than', value: 1000 },
 ],
}
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
