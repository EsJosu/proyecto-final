drop database if exists db_super;
create database db_super;
use db_super;

create table categoria(
Id_cat int auto_increment primary key not null,
Nombre_cat varchar(50)
);

create table persona(
Id_persona int auto_increment primary key not null,
Nombre varchar (50) not null,
Telefono int not null,
Nit int null,
Ci int not null
);

CREATE TABLE productos (
  Id_prod INT AUTO_INCREMENT PRIMARY KEY,
  Nombre VARCHAR(40) NOT NULL,
  Descripcion VARCHAR(40) NOT NULL,
  Precio DECIMAL(10, 2) NOT NULL,
  Cantidad INT NOT NULL,
  Imagen VARCHAR(90) default('url de imagen'),
  Id_cat int not null,
  foreign key (Id_cat) references categoria (Id_cat)
);

create table login(
	usuario VARCHAR(15) NOT NULL primary key,
    clave VARCHAR(70) NOT NULL,
	Id_persona int NOT NULL,
    fech_reg TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    foreign key (Id_persona) references persona(Id_persona)
);

CREATE TABLE factura (
  Id_factura INT AUTO_INCREMENT PRIMARY KEY,
  Id_persona INT NOT NULL,

  tipoDocumento set ('NIT','CI','Vacio') not null,
  numDocumento varchar(10) null,
  Fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (Id_persona) REFERENCES persona(Id_persona)
);

CREATE TABLE detalle_factura (
  Id_detalle_fact INT AUTO_INCREMENT PRIMARY KEY,
  Id_factura INT NOT NULL,
  Id_prod INT NOT NULL,
  costoUnitario float not null,
  descripcion varchar(100) not null,
  FOREIGN KEY (Id_factura) REFERENCES factura(Id_factura),
  FOREIGN KEY (Id_prod) REFERENCES productos(Id_prod)
);


insert into categoria(Id_cat,Nombre_cat)
values('1','lacteos'),
('2','panaderia y pasteleria'),
('3','bebidas sin alcohol'),
('4','snacks y golosinas'),
('5','enlatados');

insert into persona(Id_persona,Nombre,Telefono,Ci)
values('1','Luis ','72513212','9430300'),
('2','Jose','64539022','9100233'),
('3','Maria ','64178889','9552555'),
('4','Antonia ','64539022','9101122'),
('5','Mario ','75040300','3749003'),
('6','Jessica ','72599401','8829092'),
('7','Jason ','69029776','9227332'),
('8','Pamela ','70283394','8909112'),
('9','Daniela ','641090922','9392700'),
('10','Andres ','61244567','7495506'),
('11','Martha ','641090922','9392700'),
('12','Jorge ','641090922','9392700');

insert into productos(Id_prod,Nombre,Descripcion,Precio,Cantidad,Imagen,Id_cat)
values('1','Leche Natural Pil','Leche 946 ml','8','85','../public/img/lacteos/lechepil.jpg','1'),
('2','Dulce de Leche Pil','1km trilaminado','28','68','../public/img/lacteos/dulceleche.jpg','1'),
('3','Leche Deslactosada Pil','800 ml','7','60','../public/img/lacteos/lechedeslac.jpg','1'),
('4','Leche Condensada Pil','397 gr.','11','53','../public/img/lacteos/lechecondensa.jpg','1'),
('5','Yogurt Bonle Durazno','Bebida Lactea 940ml.','10','28','../public/img/lacteos/bonle.jpg','1'),
('6','Leche Chocolatada Delizia','946 ml.','9','81','../public/img/lacteos/lechechoco.jpg','1'),

('7','Queque de Platano','Queque mediano','20','9','../public/img/panaderia/quequepla.jpg','2'),
('8','Torta Mercadona','Torta familiar','60','11','../public/img/panaderia/tortamerc.jpg','2'),
('9','Pan Integral','barra grande','12','32','../public/img/panaderia/panint.jpg','2'),
('10','Pan Molde','550 gr.','22','53','../public/img/panaderia/panmolde.jpg','2'),
('11','Torta Tres Leches','Torta familiar','54','6','../public/img/panaderia/tortatres.jpg','2'),
('12','Pan Frances','Bolsa 1kg','9','100','../public/img/panaderia/panfrances.jpg','2'),

('13','Coca Quina','Gaseosa 3 lt.','11','45','../public/img/bebidas/cocaquina.jpg','3'),
('14','Cascada Papaya','Gaseosa 3 lt.','11','21','../public/img/bebidas/cascada.jpg','3'),
('15','Cocacola','Gaseosa 3 lt','10','50','../public/img/bebidas/cocacola.jpg','3'),
('16','Ice-Fruit Delizia','Jugo Mango 2lt','10','18','../public/img/bebidas/icefruit.jpg','3'),
('17','Agua Vital','Agua 2 lt','9','32','../public/img/bebidas/vital.jpg','3'),
('18','Tampico Clasico','Naranja 3 lt.','11','37','../public/img/bebidas/tampico.jpg','3'),

('19','Bon o Bon','Caja 50u','40','35','../public/img/snacks/bonbon.jpg','4'),
('20','Oreo','Bolsa 6u','15','60','../public/img/snacks/oreo.jpg','4'),
('21','Frac Dual-Bi','Unidad 10 Galletas','8','60','../public/img/snacks/frac.jpg','4'),
('22','Bom Bom Bum','Bolsa 24 Chupetes','30','19','../public/img/snacks/bombom.jpg','4'),
('23','Galletas Gavi','Bolsa 30u','28','13','../public/img/snacks/gabi.jpg','4'),
('24','Doblon','Bolsa 30u','25','21','../public/img/snacks/doblon.jpg','4'),

('25','Sardinas Lidita','Lata Mediana','12','35','../public/img/enlatados/sardinas.jpg','5'),
('26','Atun Van Camps','Lata Mediana','18','62','../public/img/enlatados/atun.jpg','5'),
('27','Picadillo Safra','Picadillo de Carne','8','52','../public/img/enlatados/picadillo.jpg','5'),
('28','Atun Gloria','Lata Mediana','14','60','../public/img/enlatados/atun2.jpg','5'),
('29','Delicaviar','Lata de Caviar','39','28','../public/img/enlatados/caviar.jpg','5'),
('30','Lata de Pina','Chimore grande','20','12','../public/img/enlatados/pina.jpg','5');

insert into login(Usuario,clave,Id_persona) values
('Luar','12','1'),
('Josepa','12','2'),
('Mar','12','3');

insert into factura(Id_persona,tipoDocumento,numDocumento,Fecha) values
('1','CI','9115622','2023-02-04'),
('2','CI','9204226','2023-02-04'),
('3','CI','6879541','2023-02-04'),
('1','CI','6836877','2023-02-04'),
('1','CI','9163698','2023-02-04'),
('2','NIT','927485936','2023-02-01');

insert into detalle_factura(Id_factura,Id_prod,costoUnitario,descripcion) values
('1','1','8','compra'),
('2','2','19','compra'),
('3','2','8','compra'),
('4','3','19','compra'),
('5','1','8','compra'),
('6','2','19','compra'),
('6','2','19','compra');


/*reporte productos mas solicitudes*/
select productos.Id_prod,productos.Nombre, detalle_factura.Id_prod, count(detalle_factura.Id_prod)as Vendidos from
productos,detalle_factura where
productos.Id_prod = detalle_factura.Id_prod
group by detalle_factura.Id_prod order by (vendidos)desc;