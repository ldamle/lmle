# Library for drawning and modeling logical elements

This library serves as a powerful tool for circuit designers, offering a comprehensive suite of functionalities for creating, connecting, and combining logic elements, as well as for drawing circuit diagrams and simulating signal races. It is designed to make circuit modeling accessible through a set of straightforward commands, enabling users to build and analyze complex schematic circuits with ease. With support for flexible element connections and the ability to model intricate signal interactions, the library aims to streamline the circuit design process, offering both visual and logical representations of technical elements.

> [Documentation](https://pluttan.github.io/lle/docs/documentation/)

## Installation

Create a new `node` project:
```sh
npm init
```

After initializing the project, simply add the library module -- `ldamle`:
```sh
npm install ldamle
```

After installing the module, you can import the library anywhere in your project by adding the line:

```js
import * as lle from 'ldamle';
```

## Elements

The main class of the library is the class for logical elements. Elements can be created, connected, combined, drawn, and simulated.

> [Documentation for the `Element` interface](https://pluttan.github.io/lle/docs/documentation/classes/controller_element.Element.html)

Elements are divided into two types: static and dynamic.

Since the behavior of static elements is easier to define, the library offers a complete set of functions for static elements: setting inputs, outputs, and the dependency of the output signal on the input signals, etc.

> [Documentation for the `Element` class](https://pluttan.github.io/lle/docs/documentation/classes/controller_element.Element.html)

Dynamic elements can only generate a square wave of a certain frequency; otherwise, dynamic elements can connect static elements to create complex dynamic elements.

> [Documentation for the `Generator` class](https://pluttan.github.io/lle/docs/documentation/classes/controller_element.Generator.html)

Standard elements are available in `lle.stde`.
> [Documentation for `stde`](https://pluttan.github.io/lle/docs/documentation/modules/stde_stde.html)

## Connections

All elements must be connected to each other. For this purpose, a connection class has been developed, which carries information about each connection between elements. A connection must have at least one output, but it is not required to have any inputs. A connection can have multiple inputs.

> [Documentation for the `Connection` interface](https://pluttan.github.io/lle/docs/documentation/interfaces/interface.Connection.html)

> [Documentation for the `Connection` class](https://pluttan.github.io/lle/docs/documentation/classes/controller_connection.Connection.html)

## Element Graph

For proper modeling and visualization, an element graph is created for each element, consisting of the elements connected to it and the elements that are connected to it through another element, and so on. A graph can be created if there is at least one generator in the chain.

> [Documentation for the `ElementGraph` interface](https://pluttan.github.io/lle/docs/documentation/interfaces/interface.ElementGraph.html)

> [Documentation for the `ElementGraph` class](https://pluttan.github.io/lle/docs/documentation/classes/controller_elementGraph.ElementGraph.html)

## Modeling

A queue is created based on the element graph, which is used to calculate the state of all elements at each clock cycle of the given frequency. This is handled by the modeling.

> [Documentation for the `Model` interface](https://pluttan.github.io/lle/docs/documentation/interfaces/interface.Model.html)

> [Documentation for the `Model` class](https://pluttan.github.io/lle/docs/documentation/modules/controller_model.html)

## Types

All non-standard types used in the library are described here.
> [Documentation for `Types`](https://pluttan.github.io/lle/docs/documentation/modules/types.html)

## Test Coverage
All code is covered by tests. I will add a test table here later. You can view the coverage at the following links:

> [Full code coverage](https://pluttan.github.io/lle/test/coverage/all/)

> [Full code coverage without testing library installation](https://pluttan.github.io/lle/test/coverage/awotl/)

> [Coverage of the `Connection` class](https://pluttan.github.io/lle/test/coverage/connection/)

> [Coverage of the `Element` and `Generator` classes](https://pluttan.github.io/lle/test/coverage/element/)

> [Coverage of the `ElementGraph` class](https://pluttan.github.io/lle/test/coverage/elementgraph/)

> [Coverage of types and code factories](https://pluttan.github.io/lle/test/coverage/general/)


# Библеотека для отрисовки и моделирования логических элементов

Эта библиотека является инструментом для схемотехников, предоставляя полный набор функций для создания, соединения и комбинирования логических элементов, а также для отрисовки схем и моделирования гонок сигналов. Она разработана для упрощения процесса моделирования схем с помощью простых инструкций, позволяя пользователям легко создавать и анализировать сложные схемотехнические цепи. Библиотека поддерживает гибкие соединения элементов и моделирование сложных взаимодействий сигналов, предлагая как визуальные, так и логические представления технических элементов.

> [Документация](https://pluttan.github.io/lle/docs/documentation/)

## Установка

Создайте новый `node` проект:
```sh
npm init
```

После инициализации проекта просто добавьте к нему модуль библеотеки -- `ldamle`:
```sh
npm install ldamle
```

После установки модуля библеотеку можно подключить в любом месте проекта, добавив строчку

```js
import * as lle from 'ldamle';
```

## Элементы

Основным классом библеотеки является класс логических элементов. Элеметы можно создавать, соединять, объедениять, отрисовывать и симулировать. 

> [Документация интерфейса `Element`](https://pluttan.github.io/lle/docs/documentation/interfaces/interface.Element.html)

Элементы были разделены на 2 типа: статические и динамические.

Так как поведение статических определить легче, библеотека предлагает полный набор функций для статических элементов: задание входов, выходов зависимость сигнала на выходе от сигналов на входе и т.д. 

> [Документация класса `Element`](https://pluttan.github.io/lle/docs/documentation/classes/controller_element.Element.html)

Динамические элементы могут только задавать меандр определенной частоты, в остальном к динамическим элементам можно подключать статические и получать сложные динамические элементы. 

> [Документация класса `Generator`](https://pluttan.github.io/lle/docs/documentation/classes/controller_element.Generator.html)

Стандартные элементы доступны в `lle.stde` 
> [Документация `stde`](https://pluttan.github.io/lle/docs/documentation/modules/stde_stde.html)

## Соединения

Все элементы должны соеденяться друг с другом. Для этого был разработан класс соединений, который несет в себе информацию о каждом соединении элементов. Соединению обязательно иметь один выход, но не обязательно иметь хоть один вход. Так же входов у соединения может быть несколько.

> [Документация интерфейса `Connection`](https://pluttan.github.io/lle/docs/documentation/interfaces/interface.Connection.html)

> [Документация класса `Connection`](https://pluttan.github.io/lle/docs/documentation/classes/controller_connection.Connection.html)

## Граф элементов

Для правильного моделирования и отображения уго по одному элементу создается граф элементов, состоящий из элементов, подключенных к данному и элементов которые подключены к данному через другой элемент и т.д. Граф возможно создать при наличии в цепи хотя бы одного генератора.

> [Документация интерфейса `ElementGraph`](https://pluttan.github.io/lle/docs/documentation/interfaces/interface.ElementGraph.html)

> [Документация класса `ElementGraph`](https://pluttan.github.io/lle/docs/documentation/classes/controller_elementGraph.ElementGraph.html)

## Моделирование

По графу элементов создается очередь по которой необходимо просчитать состояние всех элементов на каждый такт заданной частоты. Этим занимается моделирование.

> [Документация интерфейса `Model`](https://pluttan.github.io/lle/docs/documentation/interfaces/interface.Model.html)

> [Документация класса `Model`](https://pluttan.github.io/lle/docs/documentation/modules/controller_model.html)

## Типы
Все нестандартные типы, использованные в библеотеке описаны тут
> [Документация `Types`](https://pluttan.github.io/lle/docs/documentation/modules/types.html)


## Покрытие тестами
Весь код покрыт тестами. Позже добавлю сюда таблицу тестов.
Покрытие можно посмотреть по адресам:

> [Покрытие всего кода](https://pluttan.github.io/lle/test/coverage/all/)

> [Покрытие всего кода без тестирования установки библеотеки](https://pluttan.github.io/lle/test/coverage/awotl/)

> [Покрытие класса `Connection`](https://pluttan.github.io/lle/test/coverage/connection/)

> [Покрытие классов `Element` и `Generator`](https://pluttan.github.io/lle/test/coverage/element/)

> [Покрытие класса `ElementGraph`](https://pluttan.github.io/lle/test/coverage/elementgraph/)

> [Покрытие типов и фабрик кода](https://pluttan.github.io/lle/test/coverage/general/)





