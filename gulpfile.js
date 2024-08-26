const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify'); // Importar gulp-uglify para comprimir JS
const cleanCSS = require('gulp-clean-css'); // Importar gulp-clean-css para comprimir CSS

// Definir la tarea de combinar y comprimir archivos JavaScript
gulp.task('scripts', function() {
    return gulp.src('js/components/*.js') // Ruta a tus archivos JavaScript
        .pipe(concat('components.js')) // Nombre del archivo combinado
        .pipe(uglify()) // Comprimir el archivo combinado
        .pipe(gulp.dest('js')); // Carpeta de destino
});

// Definir la tarea de combinar y comprimir archivos CSS
gulp.task('styles', function() {
    return gulp.src('stylos/components/*.css') // Ruta a tus archivos CSS
        .pipe(concat('components.css')) // Nombre del archivo combinado
        .pipe(cleanCSS()) // Comprimir el archivo combinado
        .pipe(gulp.dest('stylos')); // Carpeta de destino
});

// Definir la tarea de vigilancia
gulp.task('watch', function() {
    gulp.watch('js/components/*.js', gulp.series('scripts')); // Observa cambios en archivos JavaScript
    gulp.watch('stylos/components/*.css', gulp.series('styles')); // Observa cambios en archivos CSS
});

// Definir la tarea por defecto
gulp.task('default', gulp.series('scripts', 'styles', 'watch'));
