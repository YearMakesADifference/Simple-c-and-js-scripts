#pragma strict

static var PenetracjaMinS = "0";
static var PenetracjaMaxS = "0";
static var KatS = "0";
static var PenetracjaMin = 0;
static var PenetracjaMax = 0;
static var Penetracja = 0.0;
static var Kat = 0.0;
static var PancerzS = "0";
static var Pancerz = 0.0;
static var OdlegloscS = "0";
static var Odleglosc = 0.0;
static var odleglosc = 0.0;
static var Kacik = 0.0;
static var WynikKat = 0.0;
static var KatWynik = 0.0;
static var ended = false;
static var OstatniaPena = 0.0;
static var OstatniKat = 0.0;
static var OstatniPancerz = 0.0;
static var OstatniaOdleglosc = 0.0;
static var OstatniaSzansa = 0.0;
static var Zapisano = false;
static var Srednia = 0;
var Picture : Texture;
var Styl : GUIStyle;
// Zmienne Wyliczeniowe

static var Grubosc1 = 0.0; //Wyliczenie pancerza plus kąt padania
static var Grubosc2 = 0.0; //Wyliczenie pancerza plus kąt padania
static var Przebicie = 0.0;
static var Wynik = 0.0;
static var Pena = 0.0;
static var WynikKoncowy = 0.0;
static var PenetracjaWynik = 0.0;
static var Szansa1 = 0.0;
static var Szansa2 = 0.0;
static var Szansa3 = 0.0;

static var Started = false;

function Start()
{
 Screen.SetResolution (1024, 768, false);
 Zapisano = false;
 Started = false;
 Szansa2 = 0.0;
 Szansa1 = 0.0;
 Szansa3 = 0.0;
 Srednia = 0;
 PenetracjaMinS = "0";
 PenetracjaMaxS = "0";
 KatS = "0";
 PenetracjaMin = 0;
 PenetracjaMax = 0;
 Penetracja = 0.0;
 Kat = 0.0;
 PancerzS = "0";
 Pancerz = 0.0;
 OdlegloscS = "0";
 Odleglosc = 0.0;
 odleglosc = 0.0;
 Wynik = 0.0;
 PenetracjaWynik = 0.0;
 Kacik = 0.0;
 WynikKat = 0.0;
 KatWynik = 0.0;
 ended = false;
 OstatniaPenaMin = 0.0;
 OstatniaPenaMax = 0.0;
 OstatniKat = 0.0;
 OstatniPancerz = 0.0;
 OstatniaOdleglosc = 0.0;
 OstatniaSzansa = 0.0;
}

function OnGUI()
{
 if(PenetracjaMinS == "")
 {
  PenetracjaMinS = "0";
 }
 if(PenetracjaMaxS == "")
 {
  PenetracjaMaxS = "0";
 }
 if(PancerzS == "")
 {
  PancerzS = "0";
 }
 if(KatS == "")
 {
  KatS = "0";
 }
 if(OdlegloscS == "")
 {
  OdlegloscS = "0";
 }
 GUI.Label(Rect(Screen.width * 0.01,Screen.height * 0.01,Screen.width * 0.25,Screen.height * 0.25),"",Styl);
 GUI.Label(Rect(Screen.width * 0.2,Screen.height * 0.35,2000,2000),"Średnia Penetracja");
 GUI.Label(Rect(Screen.width * 0.2,Screen.height * 0.4,2000,2000),"Pancerz do przebicia");
 GUI.Label(Rect(Screen.width * 0.2,Screen.height * 0.45,2000,2000),"Odległość (w kilometrach np. 0.5)");
 GUI.Label(Rect(Screen.width * 0.2,Screen.height * 0.5,2000,2000),"Kąt (0° to prostopadle)");
 
 GUI.Label(Rect(Screen.width * 0.65,Screen.height * 0.35,2000,2000),"Ostatnie : " + OstatniaPena);
 GUI.Label(Rect(Screen.width * 0.65,Screen.height * 0.4,2000,2000),"Ostatnie : " + OstatniPancerz);
 GUI.Label(Rect(Screen.width * 0.65,Screen.height * 0.45,2000,2000),"Ostatnie : " + OstatniaOdleglosc);
 GUI.Label(Rect(Screen.width * 0.65,Screen.height * 0.5,2000,2000),"Ostatnie : " + OstatniKat);
 GUI.Label(Rect(Screen.width * 0.65,Screen.height * 0.25,2000,2000),"Ostatnia szansa odbicia : " + OstatniaSzansa.ToString("f1") + "%");
 
 if(Zapisano)
 {
  if(GUI.Button(Rect(Screen.width * 0.4,Screen.height * 0.75,Screen.width * 0.2,Screen.height * 0.09),"Przywróć"))
  {
   PenetracjaMinS = OstatniaPenaMin.ToString();
   PenetracjaMaxS = OstatniaPenaMax.ToString();
   PancerzS = OstatniPancerz.ToString();
   KatS = OstatniKat.ToString();
   OdlegloscS = OstatniaOdleglosc.ToString();
  }
 }
 PenetracjaS = GUI.TextField(Rect(Screen.width * 0.425,Screen.height * 0.3,Screen.width * 0.15,Screen.height * 0.025),PenetracjaS,5);
 PancerzS = GUI.TextField(Rect(Screen.width * 0.425,Screen.height * 0.4,Screen.width * 0.15,Screen.height * 0.025),PancerzS,5);
 KatS = GUI.TextField(Rect(Screen.width * 0.425,Screen.height * 0.5,Screen.width * 0.15,Screen.height * 0.025),KatS,2);
 OdlegloscS = GUI.TextField(Rect(Screen.width * 0.425,Screen.height * 0.45,Screen.width * 0.15,Screen.height * 0.025),OdlegloscS,5);
 PenetracjaMax = float.Parse(PenetracjaMaxS);
 PenetracjaMin = float.Parse(PenetracjaMinS);
 Kat = float.Parse(KatS);
 Odleglosc = float.Parse(OdlegloscS);
 Pancerz = float.Parse(PancerzS);
 if(PenetracjaMin > 0)
 {
  if(PenetracjaMax > 0 || PenetracjaMax < PenetracjaMin)
  {
   if(Kat >= 0 && Kat <= 89)
   {
    if(Odleglosc > 0)
    {
     if(GUI.Button(Rect(Screen.width * 0.4,Screen.height * 0.55,Screen.width * 0.2,Screen.height * 0.09),"Oblicz"))
     {
     Zapisano = true;
     Started = true;
     OstatniaPenaMin = PenetracjaMin;
     OstatniaPenaMax = PenetracjaMax;
     OstatniKat = Kat;
     OstatniPancerz = Pancerz;
     OstatniaOdleglosc = Odleglosc;
     Chance();
     for(Penetracja = PenetracjaMin; Penetracja < PenetracjaMax; Penetracja++)
     {
      odleglosc = Odleglosc * 30;
      Pena = Penetracja - odleglosc;
      Grubosc1 = Pancerz * Mathf.Sqrt(2);
      Grubosc2 = Grubosc1 / 45;
      Przebicie = Grubosc2 * Kat;
      Wynik = Pena - Przebicie;
      if(Wynik > 0)
      {
       if(PenetracjaWynik == 0)
       {
        WynikKoncowy = 1;
        PenetracjaWynik = Penetracja;
       }
      }
 	 }
     }
    }
   }
  }
 }
 {
  if(Started)
   {
   if(PenetracjaWynik == 0)
   {
   if(WynikKoncowy == 0)
   {
    ObliczKat();
   }
   GUI.Label(Rect(Screen.width * 0.4,Screen.height * 0.2,2000,2000),"Przy tych danych pancerz zostanie PRZEBITY przy kącie : " + KatWynik);
   WynikKoncowy = 1;
   GUI.Label(Rect(Screen.width * 0.4,Screen.height * 0.15,2000,2000),"Na tej penetracji NIE PRZEBIJESZ pancerza pod tym kątem...");
   }
   if(PenetracjaWynik != 0)
   {
   WynikKoncowy = 1;
   Szansa1 = PenetracjaMax - PenetracjaMin;
   Szansa2 = PenetracjaWynik - PenetracjaMin;
   Szansa3 = Szansa2 / Szansa1;
   Szansa3 *= 100;
   var Sz = 100 - Szansa3;
   GUI.Label(Rect(Screen.width * 0.4,Screen.height * 0.15,2000,2000),"NAJNIŻSZA penetracja potrzebna do przebicia pod tym kątem to : " + PenetracjaWynik + "\n" + "Szansa PRZEBICIA pancerza wynosi : " + Sz.ToString("f1") + "%");
   }
  }
 }
 if(GUI.Button(Rect(Screen.width * 0.4,Screen.height * 0.65,Screen.width * 0.2,Screen.height * 0.09),"Reset - Po każdym obliczeniu"))
 {
  PenetracjaMinS = "0";
  PenetracjaMaxS = "0";
  KatS = "0";
  PenetracjaMin = 0;
  PenetracjaMax = 0;
  Penetracja = 0.0;
  Kat = 0.0;
  PancerzS = "0";
  Pancerz = 0.0;
  OdlegloscS = "0";
  Odleglosc = 0.0;
  odleglosc = 0.0;
  Grubosc1 = 0.0; //Wyliczenie pancerza plus kąt padania
  Grubosc2 = 0.0; //Wyliczenie pancerza plus kąt padania
  Przebicie = 0.0;
  Wynik = 0.0;
  Pena = 0.0;
  WynikKoncowy = 0.0;
  PenetracjaWynik = 0.0;
  Started = false;
  Kacik = 0.0;
  WynikKat = 0.0;
  KatWynik = 0.0;
  Szansa1 = 0.0;
  Szansa2 = 0.0;
  Szansa3 = 0.0;
  ended = false;
 }
 if(GUI.Button(Rect(Screen.width * 0.01,Screen.height * 0.01,Screen.width * 0.2,Screen.height * 0.09),"Przykład"))
 {
	PenetracjaMinS = "169";
	PenetracjaMaxS = "281";
	PancerzS = "110";
	KatS = "40";
	OdlegloscS = "0.2";
 }
 GUI.Label(Rect(Screen.width * 0.25,Screen.height * 0.01,2000,2000),"Przykład : " + "\n" + "1.Działo topowe z Tiger II (śr. penetracja 225)" + "\n" + "2.Pancerz IS-3 (przód) stojący na wprost działa" + "\n" + "3.Strzał z 200 metrów" + "\n" + "4.Kąt jest standardowy do nachylenia przedniej płyty IS-3");
}


function ObliczKat()
{
 for(Kacik = 90; Kacik >= 0; Kacik -= 1)
 {
  odleglosc = Odleglosc * 30;
  Pena = PenetracjaMax - odleglosc;
  Grubosc1 = Pancerz * Mathf.Sqrt(2);
  Grubosc2 = Grubosc1 / 45;
  Przebicie = Grubosc2 * Kacik;
  WynikKat = Pena - Przebicie;
  if(WynikKat > 0)
  {
   if(KatWynik == 0)
   {
    WynikKoncowy = 1;
    KatWynik = Kacik;
    ended = true;
   }
  }
 }
}

function Chance()
{
 yield WaitForSeconds(0.25);
 OstatniaSzansa = Szansa3;
}
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
 
 
 
 



