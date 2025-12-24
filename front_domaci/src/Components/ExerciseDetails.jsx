import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import './ExerciseDetails.css';
import Footer from './Footer';

const exercisesDetailsData = {
  1: { 
    name: 'Bench Press', 
    description: 'Vežba za grudi, koristi se šipka. Izvoditi sa partnerom za sigurnost.', 
    musclesTargeted: 'Pectorals (grudi), Triceps, Deltoids', 
    tips: 'Pazite na pravilno disanje, nemojte spuštati šipku previše nisko. Preporučena početna kilaža za početnike je 40-50kg.',
    setsReps: '3 serije po 10 ponavljanja.',
    video: '/videos/benchpress.mp4',
    image: '/images/benchpress.jpg'
  },
  2: { 
    name: 'Push-ups', 
    description: 'Klasične sklekove za grudi. Vrlo efikasna vežba za razvoj grudi i tricepsa.', 
    musclesTargeted: 'Pectorals, Triceps, Deltoids', 
    tips: 'Održavajte ravnu liniju tela, kontrolisano spuštajte i podizite telo.',
    setsReps: '4 serije po 15-20 ponavljanja.',
    video: '/videos/pushups.mp4',
    image: '/images/pushups.jpg'
  },
  3: { 
    name: 'Deadlift', 
    description: 'Osnovna vežba za celo telo koja aktivira gluteuse, donji deo leđa, i noge. Koristi se šipka sa opterećenjem.', 
    musclesTargeted: 'Lower Back, Gluteus, Hamstrings, Quadriceps, Forearms', 
    tips: 'Držite leđa ravna tokom cele vežbe, povucite šipku blizu tela, i koristite snagu nogu za podizanje. Preporučena početna kilaža za početnike je 40-50kg.', 
    setsReps: '3 serije po 8-10 ponavljanja.', 
    video: '/videos/deadlift.mp4', 
    image: '/images/deadlift.jpg'
  },
4: { 
    name: 'Pull-ups', 
    description: 'Vežba za gornji deo tela koja jača leđa, bicepse i ramena. Izvodi se povlačenjem tela ka vratilu.', 
    musclesTargeted: 'Latissimus Dorsi (leđa), Biceps, Trapezius', 
    tips: 'Koristite pun opseg pokreta, spustite se potpuno pre nego što započnete sledeće ponavljanje. Ako ste početnik, koristite trake za pomoć.', 
    setsReps: '4 serije po 8-12 ponavljanja.', 
    video: '/videos/pullups.mp4', 
    image: '/images/pullups.jpg'
  },
  5: { 
    name: 'Squat', 
    description: 'Osnovna vežba za donji deo tela. Izvodi se spuštanjem tela u čučanj dok držite šipku na ramenima.', 
    musclesTargeted: 'Quadriceps, Gluteus, Hamstrings, Core', 
    tips: 'Držite leđa ravna i kolena u liniji sa stopalima. Spuštajte se dok butine ne budu paralelne sa podom ili niže, ali pazite na sigurnost kolena.', 
    setsReps: '3 serije po 10-12 ponavljanja.', 
    video: '/videos/squat.mp4', 
    image: '/images/squat.jpg'
  },
6: { 
    name: 'Leg Press', 
    description: 'Vežba na mašini koja jača noge i gluteuse, idealna za kontrolisano opterećenje.', 
    musclesTargeted: 'Quadriceps, Gluteus, Hamstrings', 
    tips: 'Nemojte zaključavati kolena na vrhu pokreta. Kontrolišite opterećenje i držite leđa čvrsto naslonjena na mašinu.', 
    setsReps: '4 serije po 12-15 ponavljanja.', 
    video: '/videos/legpress.mp4', 
    image: '/images/legpress.jpg'
  },
  7: { 
    name: 'Lunges', 
    description: 'Vežba koja jača donji deo tela i poboljšava ravnotežu. Izvodi se tako što pravite korak napred dok spuštate telo prema podu.', 
    musclesTargeted: 'Quadriceps, Gluteus, Hamstrings, Core', 
    tips: 'Prilikom iskoraka, koleno prednje noge treba da ostane iznad zgloba stopala, a leđa da budu uspravna. Koristite dodatnu težinu, poput bučica, za veći izazov.', 
    setsReps: '3 serije po 12-15 ponavljanja za svaku nogu.', 
    video: '/videos/lunges.mp4', 
    image: '/images/lunges.jpg'
  },
  8: { 
    name: 'Overhead Press', 
    description: 'Vežba za jačanje ramena, koristi se šipka ili bučice. Izvodi se podizanjem težine iznad glave.', 
    musclesTargeted: 'Deltoids, Triceps, Upper Chest', 
    tips: 'Održavajte ravna leđa i izbegavajte naginjanje unazad. Kontrolišite pokret prilikom spuštanja težine.', 
    setsReps: '3 serije po 8-12 ponavljanja.', 
    video: '/videos/overhead_press.mp4', 
    image: '/images/overhead_press.jpg' 
  }, 
  9: { 
    name: 'Lateral Raises', 
    description: 'Izolaciona vežba za bočne delove ramena. Izvodi se podizanjem bučica sa strane dok su ruke blago savijene.', 
    musclesTargeted: 'Lateral Deltoids, Upper Trapezius', 
    tips: 'Izbegavajte zamahivanje i koristite kontrolisane pokrete. Počnite sa manjim težinama kako biste zadržali pravilnu formu.', 
    setsReps: '3 serije po 10-15 ponavljanja.', 
    video: '/videos/lateral_raises.mp4', 
    image: '/images/lateral_raises.jpg' 
  },
  10: { 
    name: 'Bicep Curls', 
    description: 'Vežba koja se izvodi sa bučicama ili šipkom, sa ciljem jačanja bicepsa. Držite laktove uz telo dok podižete težinu.', 
    musclesTargeted: 'Biceps', 
    tips: 'Držite ruke uspravne tokom izvođenja i izbegavajte korišćenje previše težine.', 
    setsReps: '3 serije po 10-12 ponavljanja.', 
    video: '/videos/bicep_curls.mp4', 
    image: '/images/bicep_curls.jpg' 
  },

  11: { 
      name: 'Hammer Curls', 
      description: 'Vežba za biceps koja se izvodi sa bučicama, držeći ih sa dlanovima okrenutim prema telu.', 
      musclesTargeted: 'Biceps, Brachialis', 
      tips: 'Koristite kontrolisane pokrete i izbegavajte ljuljanje tela. Počnite sa manjim težinama za bolju formu.', 
      setsReps: '3 serije po 10-12 ponavljanja.', 
      video: '/videos/hammer_curls.mp4', 
      image: '/images/hammer_curls.jpg' 
  },

  12: { 
      name: 'Tricep Dips', 
      description: 'Vežba koja koristi telesnu težinu za jačanje tricepsa. Izvodi se koristeći klupu ili sličan objekat za potporu.', 
      musclesTargeted: 'Triceps', 
      tips: 'Pazite da ne spuštate ramena previše nisko, kako biste izbegli povrede.', 
      setsReps: '3 serije po 10-15 ponavljanja.', 
      video: '/videos/tricep_dips.mp4', 
      image: '/images/tricep_dips.jpg' 
  },

  13: { 
      name: 'Overhead Tricep Extension', 
      description: 'Vežba koja koristi bučicu za izolovanje tricepsa. Držite bučicu sa obe ruke i podižite je iznad glave, zatim polako spuštajte.', 
      musclesTargeted: 'Triceps', 
      tips: 'Pazite da vam laktovi ne šire previše, kako biste zadržali pravilnu formu.', 
      setsReps: '3 serije po 10-12 ponavljanja.', 
      video: '/videos/overhead_tricep_extension.mp4', 
      image: '/images/overhead_tricep_extension.jpg' 
  },

  14: { 
      name: 'Plank', 
      description: 'Vežba za jačanje jezgra, uključujući trbušne mišiće i donji deo leđa. Držite telo u ravnoj liniji od glave do pete dok ste oslonjeni na laktovima i prstima nogu.', 
      musclesTargeted: 'Core, Trbušni mišići, Donji deo leđa', 
      tips: 'Pazite da vam leđa ostanu ravna, a stomak ne pada prema podu.', 
      setsReps: '3 serije po 30-60 sekundi.', 
      video: '/videos/plank.mp4', 
      image: '/images/plank.jpg' 
  },

  15: { 
      name: 'Bicycle Crunches', 
      description: 'Vežba koja se izvodi ležeći na leđima, sa podignutim nogama i trupom okrenutim prema suprotnim kolenima.', 
      musclesTargeted: 'Trbušni mišići, Kosi trbušni mišići', 
      tips: 'Kontrolišite pokrete i izbegavajte ubrzavanje tempa. Držite laktove šire od tela.', 
      setsReps: '3 serije po 15-20 ponavljanja po strani.', 
      video: '/videos/bicycle_crunches.mp4', 
      image: '/images/bicycle_crunches.jpg' 
  },

  16: { 
      name: 'Trčanje', 
      description: 'Osnovna kardio vežba koja poboljšava izdržljivost i kondiciju. Može se izvoditi na traci za trčanje ili na otvorenom.', 
      musclesTargeted: 'Celo telo', 
      tips: 'Pazite na pravilnu formu i disanje tokom trčanja, i izbegavajte prebrzo počinjanje.', 
      setsReps: '30 minuta trčanja u umjerenom tempu.', 
      video: '/videos/trcanje.mp4', 
      image: '/images/trcanje.jpg' 
  },

  17: { 
      name: 'Burpees', 
      description: 'Visoko intenzivna vežba koja kombinuje čučanj, sklek i skok, koristeći telesnu težinu.', 
      musclesTargeted: 'Celo telo', 
      tips: 'Pazite na pravilnu formu pri izvođenju sklekova i skokova, kako biste sprečili povrede.', 
      setsReps: '3 serije po 10-15 ponavljanja.', 
      video: '/videos/burpees.mp4', 
      image: '/images/burpees.jpg' 
  }

};

const ExerciseDetails = () => {
  const { exerciseId } = useParams();
  const exercise = exercisesDetailsData[exerciseId];
  const navigate = useNavigate();

  if (!exercise) {
    return (
      <div className="exercise-details-container">
        <Navigation />
        <h1>Vežba nije pronađena</h1>
        <button onClick={() => navigate('/grupa/1')}>Vratite se na listu vežbi</button>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <Navigation />
      <div className="exercise-details-container">
        <h1>{exercise.name}</h1>
        <img src={exercise.image} alt={exercise.name} className="exercise-image" />
        <p>{exercise.description}</p>

        <div className="exercise-info">
          <h2>Mišići na koje utiče:</h2>
          <p>{exercise.musclesTargeted}</p>
          
          <h2>Savet:</h2>
          <div className="tips">
            <p>{exercise.tips}</p>
          </div>
          
          <h2>Broj serija i ponavljanja:</h2>
          <div className="sets-reps">
            <p>{exercise.setsReps}</p>
          </div>
          
          <h2>Video uputstvo:</h2>
          <video controls>
            <source src={exercise.video} type="video/mp4" />
            Vaš preglednik ne podržava video tag.
          </video>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default ExerciseDetails;
