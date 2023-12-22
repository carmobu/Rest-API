import 'dotenv/config';
import './baseDeDatos.js';
import servidor from './servidor.js';

const puerto = servidor.get('port');

servidor.listen(puerto, () =>{
    console.log(`Sevidor ejecutandose en el puerto ${puerto}`);
});