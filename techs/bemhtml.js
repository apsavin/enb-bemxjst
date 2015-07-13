/**
 * bemhtml
 * =======
 *
 * Склеивает *bemhtml*-файлы по deps'ам, обрабатывает `bem-xjst`-транслятором,
 * сохраняет (по умолчанию) в виде `?.bemhtml.js`.
 * **Внимание:** По умолчанию поддерживает только JS-синтаксис. Чтобы включить поддержку первоначального синтаксиса
 * используйте `compat` опцию.
 *
 * **Опции**
 *
 * * *String* **target** — Результирующий таргет. По умолчанию — `?.bemhtml.js`.
 * * *String* **filesTarget** — files-таргет, на основе которого получается список исходных файлов
 *   (его предоставляет технология `files`). По умолчанию — `?.files`.
 * * *String* **sourceSuffixes** — суффиксы файлов, по которым строится `files`-таргет.
 *    По умолчанию — `['bemhtml']`.
 * * *String* **exportName** — Имя переменной-обработчика BEMHTML. По умолчанию — `'BEMHTML'`.
 * * *Boolean* **compat** — Поддержка первоначального синтаксиса. По умолчанию — false.
 * * *Boolean* **devMode** — Development-режим. По умолчанию — true.
 * * *Boolean* **cache** — Кэширование. Возможно только в production-режиме. По умолчанию — `false`.
 * * *Object* **requires** - Объект с объявлением зависимостей для различных модульных систем.
 *    По умолчанию - пустой объект.
 * **Пример**
 *
 * ```javascript
 * nodeConfig.addTech([ require('enb-bemxjst/techs/bemhtml'), { devMode: false } ]);
 * ```
 */
var bundle = require('../lib/bundle'),
    BEMHTML_MOCK = 'exports.apply = function () { return ""; };';

module.exports = require('./bem-xjst').buildFlow()
    .name('bemhtml')
    .target('target', '?.bemhtml.js')
    .defineOption('exportName', 'BEMHTML')
    .defineOption('compat', false)
    .defineOption('devMode', true)
    .defineOption('cache', false)
    .defineOption('requires', {})
    .useFileList(['bemhtml.js', 'bemhtml'])
    .builder(function (sourceFiles) {
        if (sourceFiles.length === 0) {
            return bundle.compile(BEMHTML_MOCK, {
                exportName: this._exportName
            });
        }

        return this._sourceFilesProcess(sourceFiles, this._compat);
    })
    .createTech();
