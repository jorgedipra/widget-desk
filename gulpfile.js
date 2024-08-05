const gulp = require('gulp');
const concat = require('gulp-concat');

// Definir la tarea de combinar archivos JavaScript
gulp.task('scripts', function() {
    return gulp.src('js/components/*.js') // Ruta a tus archivos JavaScript
        .pipe(concat('components.js')) // Nombre del archivo combinado
        .pipe(gulp.dest('js')); // Carpeta de destino
});


// Definir la tarea de vigilancia
gulp.task('watch', function() {
    gulp.watch('js/components/*.js', gulp.series('scripts')); // Observa cambios en archivos JavaScript
});

// Definir la tarea por defecto
gulp.task('default', gulp.series('scripts', 'watch'));
