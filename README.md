# Fitnes aplikacija
Aplikacija za fitnes planiranje pruža korisnicima detaljan pregled grupa mišića, vežbi i mogućnosti personalizacije treninga, uz jasnu podelu uloga na administratore, trenere i vežbače.

Funkcionalnosti za Admina:

•	Grupe mišića: Admin može da dodaje nove grupe mišića koje se prikazuju na početnoj stranici. Svaka grupa ima naziv, opis i propratni vizuelni prikaz.
•	Treneri: Admin ima uvid u listu svih registrovanih trenera. Može obrisati trenera, ali vežbe koje je trener uneo ostaju dostupne korisnicima.
•	Vežbači: Admin može pregledati listu svih registrovanih korisnika (vežbača). Ako obriše vežbača, brišu se i njegovi personalizovani planovi treninga.

Funkcionalnosti za Trenere:

•	Dodavanje vežbi: Kada trener otvori određenu grupu mišića, može dodati novu vežbu. Svaka vežba sadrži naziv, opis, kategoriju (npr. BodyWeight, Tegovi) i video prikaz pravilnog izvođenja.
•	Izmena vežbi: Trener može izmeniti postojeće vežbe, menjajući opis ili postavljajući novi video sadržaj.

Funkcionalnosti za Vežbače:

•	Pregled mišićnih grupa i vežbi: Vežbači imaju mogućnost pregleda svih grupa mišića i vežbi unutar njih. Svaka vežba sadrži detaljan opis i video tutorijal.
•	Sastavljanje plana treninga: Kroz formu u aplikaciji, vežbači mogu kreirati sopstvene planove treninga birajući vežbe, određujući broj serija i ponavljanja. Kreirani planovi se čuvaju i mogu se pregledati u sekciji Moji Planovi.
•	Fitnes dnevnik: Vežbači mogu uneti beleške o svom napretku u Moj Fitnes Dnevnik. Svaka stavka uključuje datum unosa, naziv i opis aktivnosti.

Zajedničke funkcionalnosti:

•	Početna stranica: Prikazuje razne grupe mišića u vidu prozora sa slikama, omogućen je pregled detalja i sadržaja vezanih za svaku grupu.


# Kloniranje projekta i neophodne postavke
 
- Klonirati repozitorijum komandom `git clone https://github.com/elab-development/internet-tehnologije-2024-projekat-fitness_2021_0344.git` na željenu destinaciju na vašem računaru
- U željenom tekstualnom editoru otvoriti klonirani projekat (preporuka VSCode)
 
# Pokretanje Laravel dela projekta
 
- Pozicionirati se  komandom `cd back` u laravelov deo projekta
- Instalirati composer komandom `composer install`
- Kreirati .env fajl u root-u laravel projekta i podesiti informacije o konekciji sa bazom: DB_PORT, DB_USERNAME, DB_PASSWORD, DB_HOST
- Popuniti bazu podacima komandom `php artisan migrate:fresh --seed`
- Pokrenuti aplikaciju komandom `php artisan serve`
 
# Pokretanje React aplikacije domaci
 
- Pozicionirati se  komandom `cd front_domaci` u react domaci folder (Neophodno je prvo pozicionirati se u root direktorijum komandom `cd ..`)
- Komandom `npm install` ( ili `npm i`), instalirati neophodne pakete za pokretanje same aplikacije
- Pokrenuti aplikaciju komandom `npm start`

# Pokretanje React aplikacije projekat
 
- Pozicionirati se  komandom `cd front_projekat` u react  folder povezan sa laravelom za potrebe projekta (Neophodno je prvo pozicionirati se u root direktorijum komandom `cd ..`)
- Komandom `npm install` ( ili `npm i`), instalirati neophodne pakete za pokretanje same aplikacije
- Pokrenuti aplikaciju komandom `npm start`
