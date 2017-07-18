#pragma strict

static var Shop = false;

/*		
		Tablice : 
		0 - MinDmg
		1 - MaxDmg
		2 - Magazynek
		3 - Cel
		4 - Speed
		5 - Cena
*/

/*		
		Typy :
		1 - Rewolwer
		2 - Assault
		3 - Sniper
*/
var StylNapis : GUIStyle;
private var Slot1 : float[] = new float[6];
private var Slot2 : float[] = new float[6];
private var Slot3 : float[] = new float[6];
private var Slot4 : float[] = new float[6];
private var Slot5 : float[] = new float[6];
private var Slot1Typ = 0;
private var Slot2Typ = 0;
private var Slot3Typ = 0;
private var Slot4Typ = 0;
private var Slot5Typ = 0;
var timerNoweTowary = 0.0;
private var TimerNoweTowary = 0.0;
private var Losowanie = 0;
private var Wybrany = 0;
private var Wykupiony1 = false;
private var Wykupiony2 = false;
private var Wykupiony3 = false;
private var Wykupiony4 = false;
private var Wykupiony5 = false;
private var Typ1 = "";
private var Typ2 = "";
private var Typ3 = "";
private var Typ4 = "";
private var Typ5 = "";
private var Trwa = false;
private var Rank1 = 0;
private var Rank2 = 0;
private var Rank3 = 0;
private var Rank4 = 0;
private var Rank5 = 0;
private var Ready = false;
static var Pokaz = false;
static var PokazNot = false;

var CenaAmmoRewolwer = 0;
var CenaAmmoSniper = 0;
var CenaAmmoAssault = 0;

function Start()
{
	Ready = false;
	TimerNoweTowary = timerNoweTowary * 60;
	Trwa = true;
	yield WaitForSeconds(5);
	Ready = true;
	Losuj();
}

function Losuj()
{
	Typ1 = "";
	Typ2 = "";
	Typ3 = "";
	Typ4 = "";
	Typ5 = "";
	Wykupiony1 = false;
	Wykupiony2 = false;
	Wykupiony3 = false;
	Wykupiony4 = false;
	Wykupiony5 = false;
	Rank1 = 0;
	Rank2 = 0;
	Rank3 = 0;
	Rank4 = 0;
	Rank5 = 0;
	Slot1Typ = Random.Range(1,4);
	Slot2Typ = Random.Range(1,4);
	Slot3Typ = Random.Range(1,4);
	Slot4Typ = Random.Range(1,4);
	Slot5Typ = Random.Range(1,4);
	if(Slot1Typ > 0)
	{
		if(Slot1Typ == 1)
		{
			Typ1 = "Rewolwer";
			Slot1[0] = Random.Range(Gracz.LV * 10, Gracz.LV * 30);
			Slot1[1] = Random.Range(Gracz.LV * 20, Gracz.LV * 40);
			Slot1[2] = Random.Range(5, 11);
			Slot1[3] = Random.Range(0.5, 1.25);
			Slot1[4] = Random.Range(0.4, 1.25);
			Slot1[5] = (Slot1[0] + Slot1[1] + Slot1[2] + (2.5 - Slot1[3]) + (4 - Slot1[4])) * 5;
			if(Slot1[0] >= Gracz.LV * 20)
			{
				Rank1++;
			}
			if(Slot1[1] >= Gracz.LV * 30)
			{
				Rank1++;
			}
			if(Slot1[2] >= 7)
			{
				Rank1++;
			}
			if(Slot1[3] <= 0.875)
			{
				Rank1++;
			}
			if(Slot1[4] <= 0.825)
			{
				Rank1++;
			}
		}
		if(Slot1Typ == 2)
		{
			Typ1 = "Assault";
			Slot1[0] = Random.Range(Gracz.LV * 10, Gracz.LV * 30);
			Slot1[1] = Random.Range(Gracz.LV * 20, Gracz.LV * 40);
			Slot1[2] = Random.Range(20, 51);
			Slot1[3] = Random.Range(0.8, 1.75);
			Slot1[4] = Random.Range(0.1, 0.35);
			Slot1[5] = (Slot1[0] + Slot1[1] + Slot1[2] + (3.5 - Slot1[3]) + (0.7 - Slot1[4])) * 5;
			if(Slot1[0] >= Gracz.LV * 20)
			{
				Rank1++;
			}
			if(Slot1[1] >= Gracz.LV * 30)
			{
				Rank1++;
			}
			if(Slot1[2] >= 35)
			{
				Rank1++;
			}
			if(Slot1[3] <= 1.275)
			{
				Rank1++;
			}
			if(Slot1[4] <= 0.225)
			{
				Rank1++;
			}
		}
		if(Slot1Typ == 3)
		{
			Typ1 = "Sniper";
			Slot1[0] = Random.Range(Gracz.LV * 50, Gracz.LV * 70);
			Slot1[1] = Random.Range(Gracz.LV * 70, Gracz.LV * 90);
			Slot1[2] = Random.Range(3, 7);
			Slot1[3] = Random.Range(0.1, 0.2);
			Slot1[4] = Random.Range(1.5, 3);
			Slot1[5] = ((Slot1[0] + Slot1[1] + Slot1[2] + (0.4 - Slot1[3]) + (6 - Slot1[4])) * 5) * 0.75;
			if(Slot1[0] >= Gracz.LV * 60)
			{
				Rank1++;
			}
			if(Slot1[1] >= Gracz.LV * 80)
			{
				Rank1++;
			}
			if(Slot1[2] >= 4.5)
			{
				Rank1++;
			}
			if(Slot1[3] <= 0.15)
			{
				Rank1++;
			}
			if(Slot1[4] <= 2.25)
			{
				Rank1++;
			}
		}
	}
	if(Slot2Typ > 0)
	{
		if(Slot2Typ == 1)
		{
			Typ2 = "Rewolwer";
			Slot2[0] = Random.Range(Gracz.LV * 10, Gracz.LV * 30);
			Slot2[1] = Random.Range(Gracz.LV * 20, Gracz.LV * 40);
			Slot2[2] = Random.Range(5, 11);
			Slot2[3] = Random.Range(0.5, 1.25);
			Slot2[4] = Random.Range(0.4, 1.25);
			Slot2[5] = (Slot1[0] + Slot1[1] + Slot1[2] + (2.5 - Slot2[3]) + (4 - Slot2[4])) * 5;
			if(Slot2[0] >= Gracz.LV * 20)
			{
				Rank2++;
			}
			if(Slot2[1] >= Gracz.LV * 30)
			{
				Rank2++;
			}
			if(Slot2[2] >= 7)
			{
				Rank2++;
			}
			if(Slot2[3] <= 0.875)
			{
				Rank2++;
			}
			if(Slot2[4] <= 0.825)
			{
				Rank2++;
			}
		}
		if(Slot2Typ == 2)
		{
			Typ2 = "Assault";
			Slot2[0] = Random.Range(Gracz.LV * 10, Gracz.LV * 30);
			Slot2[1] = Random.Range(Gracz.LV * 20, Gracz.LV * 40);
			Slot2[2] = Random.Range(20, 51);
			Slot2[3] = Random.Range(0.8, 1.75);
			Slot2[4] = Random.Range(0.1, 0.35);
			Slot2[5] = (Slot2[0] + Slot2[1] + Slot2[2] + (3.5 - Slot2[3]) + (0.7 - Slot2[4])) * 5;
			if(Slot2[0] >= Gracz.LV * 20)
			{
				Rank2++;
			}
			if(Slot2[1] >= Gracz.LV * 30)
			{
				Rank2++;
			}
			if(Slot2[2] >= 35)
			{
				Rank2++;
			}
			if(Slot2[3] <= 1.275)
			{
				Rank2++;
			}
			if(Slot2[4] <= 0.225)
			{
				Rank2++;
			}
		}
		if(Slot2Typ == 3)
		{
			Typ2 = "Sniper";
			Slot2[0] = Random.Range(Gracz.LV * 50, Gracz.LV * 70);
			Slot2[1] = Random.Range(Gracz.LV * 70, Gracz.LV * 90);
			Slot2[2] = Random.Range(3, 7);
			Slot2[3] = Random.Range(0.1, 0.2);
			Slot2[4] = Random.Range(1.5, 3);
			Slot2[5] = ((Slot2[0] + Slot2[1] + Slot2[2] + (0.4 - Slot2[3]) + (6 - Slot2[4])) * 5) * 0.75;
			if(Slot2[0] >= Gracz.LV * 60)
			{
				Rank2++;
			}
			if(Slot2[1] >= Gracz.LV * 80)
			{
				Rank2++;
			}
			if(Slot2[2] >= 4.5)
			{
				Rank2++;
			}
			if(Slot2[3] <= 0.15)
			{
				Rank2++;
			}
			if(Slot2[4] <= 2.25)
			{
				Rank2++;
			}
		}
	}
	if(Slot3Typ > 0)
	{
		if(Slot3Typ == 1)
		{
			Typ3 = "Rewolwer";
			Slot3[0] = Random.Range(Gracz.LV * 10, Gracz.LV * 30);
			Slot3[1] = Random.Range(Gracz.LV * 20, Gracz.LV * 40);
			Slot3[2] = Random.Range(5, 11);
			Slot3[3] = Random.Range(0.5, 1.25);
			Slot3[4] = Random.Range(0.4, 1.25);
			Slot3[5] = (Slot3[0] + Slot3[1] + Slot3[2] + (2.5 - Slot3[3]) + (4 - Slot3[4])) * 5;
			if(Slot3[0] >= Gracz.LV * 20)
			{
				Rank3++;
			}
			if(Slot3[1] >= Gracz.LV * 30)
			{
				Rank3++;
			}
			if(Slot3[2] >= 7)
			{
				Rank3++;
			}
			if(Slot3[3] <= 0.875)
			{
				Rank3++;
			}
			if(Slot3[4] <= 0.825)
			{
				Rank3++;
			}
		}
		if(Slot3Typ == 2)
		{
			Typ3 = "Assault";
			Slot3[0] = Random.Range(Gracz.LV * 10, Gracz.LV * 30);
			Slot3[1] = Random.Range(Gracz.LV * 20, Gracz.LV * 40);
			Slot3[2] = Random.Range(20, 51);
			Slot3[3] = Random.Range(0.8, 1.75);
			Slot3[4] = Random.Range(0.1, 0.35);
			Slot3[5] = (Slot3[0] + Slot3[1] + Slot3[2] + (3.5 - Slot3[3]) + (0.7 - Slot3[4])) * 5;
			if(Slot3[0] >= Gracz.LV * 20)
			{
				Rank3++;
			}
			if(Slot3[1] >= Gracz.LV * 30)
			{
				Rank3++;
			}
			if(Slot3[2] >= 35)
			{
				Rank3++;
			}
			if(Slot3[3] <= 1.275)
			{
				Rank3++;
			}
			if(Slot3[4] <= 0.225)
			{
				Rank3++;
			}
		}
		if(Slot3Typ == 3)
		{
			Typ3 = "Sniper";
			Slot3[0] = Random.Range(Gracz.LV * 50, Gracz.LV * 70);
			Slot3[1] = Random.Range(Gracz.LV * 70, Gracz.LV * 90);
			Slot3[2] = Random.Range(3, 7);
			Slot3[3] = Random.Range(0.1, 0.2);
			Slot3[4] = Random.Range(1.5, 3);
			Slot3[5] = ((Slot3[0] + Slot3[1] + Slot3[2] + (0.4 - Slot3[3]) + (6 - Slot3[4])) * 5) * 0.75;
			if(Slot3[0] >= Gracz.LV * 60)
			{
				Rank3++;
			}
			if(Slot3[1] >= Gracz.LV * 80)
			{
				Rank3++;
			}
			if(Slot3[2] >= 4.5)
			{
				Rank3++;
			}
			if(Slot3[3] <= 0.15)
			{
				Rank3++;
			}
			if(Slot3[4] <= 2.25)
			{
				Rank3++;
			}
		}
	}
	if(Slot4Typ > 0)
	{
		if(Slot4Typ == 1)
		{
			Typ4 = "Rewolwer";
			Slot4[0] = Random.Range(Gracz.LV * 10, Gracz.LV * 30);
			Slot4[1] = Random.Range(Gracz.LV * 20, Gracz.LV * 40);
			Slot4[2] = Random.Range(5, 11);
			Slot4[3] = Random.Range(0.5, 1.25);
			Slot4[4] = Random.Range(0.4, 1.25);
			Slot4[5] = (Slot4[0] + Slot4[1] + Slot4[2] + (2.5 - Slot4[3]) + (4 - Slot4[4])) * 5;
			if(Slot4[0] >= Gracz.LV * 20)
			{
				Rank4++;
			}
			if(Slot4[1] >= Gracz.LV * 30)
			{
				Rank4++;
			}
			if(Slot4[2] >= 7)
			{
				Rank4++;
			}
			if(Slot4[3] <= 0.875)
			{
				Rank4++;
			}
			if(Slot4[4] <= 0.825)
			{
				Rank4++;
			}
		}
		if(Slot4Typ == 2)
		{
			Typ4 = "Assault";
			Slot4[0] = Random.Range(Gracz.LV * 10, Gracz.LV * 30);
			Slot4[1] = Random.Range(Gracz.LV * 20, Gracz.LV * 40);
			Slot4[2] = Random.Range(20, 51);
			Slot4[3] = Random.Range(0.8, 1.75);
			Slot4[4] = Random.Range(0.1, 0.35);
			Slot4[5] = (Slot4[0] + Slot4[1] + Slot4[2] + (3.5 - Slot4[3]) + (0.7 - Slot4[4])) * 5;
			if(Slot4[0] >= Gracz.LV * 20)
			{
				Rank4++;
			}
			if(Slot4[1] >= Gracz.LV * 30)
			{
				Rank4++;
			}
			if(Slot4[2] >= 35)
			{
				Rank4++;
			}
			if(Slot4[3] <= 1.275)
			{
				Rank4++;
			}
			if(Slot4[4] <= 0.225)
			{
				Rank4++;
			}
		}
		if(Slot4Typ == 3)
		{
			Typ4 = "Sniper";
			Slot4[0] = Random.Range(Gracz.LV * 50, Gracz.LV * 70);
			Slot4[1] = Random.Range(Gracz.LV * 70, Gracz.LV * 90);
			Slot4[2] = Random.Range(3, 7);
			Slot4[3] = Random.Range(0.1, 0.2);
			Slot4[4] = Random.Range(1.5, 3);
			Slot4[5] = ((Slot4[0] + Slot4[1] + Slot4[2] + (0.4 - Slot4[3]) + (6 - Slot4[4])) * 5) * 0.75;
			if(Slot4[0] >= Gracz.LV * 60)
			{
				Rank4++;
			}
			if(Slot4[1] >= Gracz.LV * 80)
			{
				Rank4++;
			}
			if(Slot4[2] >= 4.5)
			{
				Rank4++;
			}
			if(Slot4[3] <= 0.15)
			{
				Rank4++;
			}
			if(Slot4[4] <= 2.25)
			{
				Rank4++;
			}
		}
	}
	if(Slot5Typ > 0)
	{
		if(Slot5Typ == 1)
		{
			Typ5 = "Rewolwer";
			Slot5[0] = Random.Range(Gracz.LV * 10, Gracz.LV * 30);
			Slot5[1] = Random.Range(Gracz.LV * 20, Gracz.LV * 40);
			Slot5[2] = Random.Range(5, 11);
			Slot5[3] = Random.Range(0.5, 1.25);
			Slot5[4] = Random.Range(0.4, 1.25);
			Slot5[5] = (Slot5[0] + Slot5[1] + Slot5[2] + (2.5 - Slot5[3]) + (4 - Slot5[4])) * 5;
			if(Slot5[0] >= Gracz.LV * 20)
			{
				Rank5++;
			}
			if(Slot5[1] >= Gracz.LV * 30)
			{
				Rank5++;
			}
			if(Slot5[2] >= 7)
			{
				Rank5++;
			}
			if(Slot5[3] <= 0.875)
			{
				Rank5++;
			}
			if(Slot5[4] <= 0.825)
			{
				Rank5++;
			}
		}
		if(Slot5Typ == 2)
		{
			Typ5 = "Assault";
			Slot5[0] = Random.Range(Gracz.LV * 10, Gracz.LV * 30);
			Slot5[1] = Random.Range(Gracz.LV * 20, Gracz.LV * 40);
			Slot5[2] = Random.Range(20, 51);
			Slot5[3] = Random.Range(0.8, 1.75);
			Slot5[4] = Random.Range(0.1, 0.35);
			Slot5[5] = (Slot5[0] + Slot5[1] + Slot5[2] + (3.5 - Slot5[3]) + (0.7 - Slot5[4])) * 5;
			if(Slot5[0] >= Gracz.LV * 20)
			{
				Rank5++;
			}
			if(Slot5[1] >= Gracz.LV * 30)
			{
				Rank5++;
			}
			if(Slot5[2] >= 35)
			{
				Rank5++;
			}
			if(Slot5[3] <= 1.275)
			{
				Rank5++;
			}
			if(Slot5[4] <= 0.225)
			{
				Rank5++;
			}
		}
		if(Slot5Typ == 3)
		{
			Typ5 = "Sniper";
			Slot5[0] = Random.Range(Gracz.LV * 50, Gracz.LV * 70);
			Slot5[1] = Random.Range(Gracz.LV * 70, Gracz.LV * 90);
			Slot5[2] = Random.Range(3, 7);
			Slot5[3] = Random.Range(0.1, 0.2);
			Slot5[4] = Random.Range(1.5, 3);
			Slot5[5] = ((Slot5[0] + Slot5[1] + Slot5[2] + (0.4 - Slot5[3]) + (6 - Slot5[4])) * 5) * 0.75;
			if(Slot5[0] >= Gracz.LV * 60)
			{
				Rank5++;
			}
			if(Slot5[1] >= Gracz.LV * 80)
			{
				Rank5++;
			}
			if(Slot5[2] >= 4.5)
			{
				Rank5++;
			}
			if(Slot5[3] <= 0.15)
			{
				Rank5++;
			}
			if(Slot5[4] <= 2.25)
			{
				Rank5++;
			}
		}
	}
	TimerNoweTowary = timerNoweTowary * 60;
	RandomEnd();
	Trwa = false;
}

function RandomEnd()
{
	PokazNot = false;
	Pokaz = true;
	yield WaitForSeconds(5);
	Pokaz = false;
}

function NotReady()
{
	PokazNot = true;
	yield WaitForSeconds(5);
	PokazNot = false;
}

function Update()
{
	TimerNoweTowary -= Time.deltaTime;
	if(TimerNoweTowary <= 0)
	{
		if(!Trwa)
		{
			Trwa = true;
			Losuj();
		}
	}
	if(Input.GetKeyDown("e") && !Shop)
	{
		if(!Ready)
		{
			NotReady();
		}
		if(Ready)
		{
			Ekwipunek.PokazCelownik = false;
			Pokaz = false;
			PokazNot = false;
			Wybrany = 0;
			Shop = true;
		}
	}
}

function OnGUI()
{
	if(Ready)
	{
		if(Shop)
		{
			GUI.Box(Rect(Screen.width * 0.1,Screen.height * 0.1,Screen.width * 0.8,Screen.height * 0.8),"Sklep");
			GUI.Label(Rect(Screen.width * 0.15,Screen.height * 0.1,Screen.width * 0.8,Screen.height * 0.8),"Nowa towary : " + TimerNoweTowary.ToString("f0") + " s");
			if(GUI.Button(Rect(Screen.width * 0.1,Screen.height * 0.1,Screen.width * 0.025,Screen.width * 0.025),"X"))
			{
				Ekwipunek.PokazCelownik = true;
				Wybrany = 0;
				Shop = false;
			}
			if(Ekwipunek.AktualnaBronTyp == "Rewolwer")
			{
				GUI.Label(Rect(Screen.width * 0.4,Screen.height * 0.575,Screen.width * 0.3,Screen.height * 0.4),"Typ : Rewolwer");
			}
			if(Ekwipunek.AktualnaBronTyp == "Assault")
			{
				GUI.Label(Rect(Screen.width * 0.4,Screen.height * 0.575,Screen.width * 0.3,Screen.height * 0.4),"Typ : Karabin szturmowy");
			}
			if(Ekwipunek.AktualnaBronTyp == "Sniper")
			{
				GUI.Label(Rect(Screen.width * 0.4,Screen.height * 0.575,Screen.width * 0.3,Screen.height * 0.4),"Typ : Karabin snajperski");
			}
			GUI.Label(Rect(Screen.width * 0.4,Screen.height * 0.6,Screen.width * 0.3,Screen.height * 0.4),"Dane aktualnej broni : " + "\n" + "\n" + "Ranga : " + Ekwipunek.AktualnaBronRank + " / 5" + "\n" + "Obrażenia minimalne : " + Ekwipunek.AktualnaBronMinDmg.ToString("f0") + "\n" + "Obrażenia maksymalne : " + Ekwipunek.AktualnaBronMaxDmg.ToString("f0") + "\n" + "Pojemność magazynka : " + Ekwipunek.AktualnaBronMag.ToString("f0") + "\n" + "Rozrzut : " + Ekwipunek.AktualnaBronCel.ToString("f2") + " m / 100 m" + "\n" + "Szybkostrzelność : " + Ekwipunek.AktualnaBronSpd.ToString("f2") + " s " + "\n" + "Cena : -");
			if(GUI.Button(Rect(Screen.width * 0.15,Screen.height * 0.15,Screen.width * 0.2,Screen.height * 0.09),"Miejsce 1"))
			{
				Wybrany = 1;
			}
			if(GUI.Button(Rect(Screen.width * 0.15,Screen.height * 0.25,Screen.width * 0.2,Screen.height * 0.09),"Miejsce 2"))
			{
				Wybrany = 2;
			}
			if(GUI.Button(Rect(Screen.width * 0.15,Screen.height * 0.35,Screen.width * 0.2,Screen.height * 0.09),"Miejsce 3"))
			{
				Wybrany = 3;
			}
			if(GUI.Button(Rect(Screen.width * 0.15,Screen.height * 0.45,Screen.width * 0.2,Screen.height * 0.09),"Miejsce 4"))
			{
				Wybrany = 4;
			}
			if(GUI.Button(Rect(Screen.width * 0.15,Screen.height * 0.55,Screen.width * 0.2,Screen.height * 0.09),"Miejsce 5"))
			{
				Wybrany = 5;
			}
			if(GUI.Button(Rect(Screen.width * 0.15,Screen.height * 0.7,Screen.width * 0.2,Screen.height * 0.05),"Amunicja 1"))
			{
				Wybrany = 6;
			}
			if(GUI.Button(Rect(Screen.width * 0.15,Screen.height * 0.76,Screen.width * 0.2,Screen.height * 0.05),"Amunicja 2"))
			{
				Wybrany = 7;
			}
			if(GUI.Button(Rect(Screen.width * 0.15,Screen.height * 0.82,Screen.width * 0.2,Screen.height * 0.05),"Amunicja 3"))
			{
				Wybrany = 8;
			}
			if(Wybrany > 0)
			{
				if(Wybrany == 1)
				{
					if(Typ1 == "Rewolwer")
					{
						GUI.Label(Rect(Screen.width * 0.4,Screen.height * 0.225,Screen.width * 0.3,Screen.height * 0.4),"Typ : Rewolwer  |  Ranga : " + Rank1 + " / 5");
					}
					if(Typ1 == "Assault")
					{
						GUI.Label(Rect(Screen.width * 0.4,Screen.height * 0.225,Screen.width * 0.3,Screen.height * 0.4),"Typ : Karabin szturmowy  |  Ranga : " + Rank1 + " / 5");
					}
					if(Typ1 == "Sniper")
					{
						GUI.Label(Rect(Screen.width * 0.4,Screen.height * 0.225,Screen.width * 0.3,Screen.height * 0.4),"Typ : Karabin snajperski  |  Ranga : " + Rank1 + " / 5");
					}
					GUI.Label(Rect(Screen.width * 0.4,Screen.height * 0.25,Screen.width * 0.3,Screen.height * 0.4),"Dane broni : " + "\n" + "\n" + "Minimalne obrażenia : " + Slot1[0].ToString("f0") + "\n" + "Maksymalne obrażenia : " + Slot1[1].ToString("f0") + "\n" + "Pojemność magazynka : " + Slot1[2] + "\n" + "Rozrzut : " + Slot1[3].ToString("f2") + " m / 100 m" + "\n" + "Szybkostrzelność : " + Slot1[4].ToString("f2") + "\n" + "Cena : " + Slot1[5].ToString("f0"));
					if(!Wykupiony1)
					{
						if(Ekwipunek.Money >= Slot1[5])
						{
							if(GUI.Button(Rect(Screen.width * 0.4,Screen.height * 0.15,Screen.width * 0.2,Screen.height * 0.05),"Kup"))
							{
								Ekwipunek.AktualnaBronTyp = Typ1;
								Ekwipunek.AktualnaBronMinDmg = Slot1[0];
								Ekwipunek.AktualnaBronMaxDmg = Slot1[1];
								Ekwipunek.AktualnaBronMag = Mathf.Round(Slot1[2]);
								Ekwipunek.AktualnaBronCel = Slot1[3];
								Ekwipunek.AktualnaBronSpd = Slot1[4];
								Ekwipunek.AktualnaBronRank = Rank1;
								Ekwipunek.Money -= Slot1[5];
								Ekwipunek.Zmien = true;
								Wykupiony1 = true;
							}
						}
					}
				}
				if(Wybrany == 2)
				{
					if(Typ2 == "Rewolwer")
					{
						GUI.Label(Rect(Screen.width * 0.4,Screen.height * 0.225,Screen.width * 0.3,Screen.height * 0.4),"Typ : Rewolwer  |  Ranga : " + Rank2 + " / 5");
					}
					if(Typ2 == "Assault")
					{
						GUI.Label(Rect(Screen.width * 0.4,Screen.height * 0.225,Screen.width * 0.3,Screen.height * 0.4),"Typ : Karabin szturmowy  |  Ranga : " + Rank2 + " / 5");
					}
					if(Typ2 == "Sniper")
					{
						GUI.Label(Rect(Screen.width * 0.4,Screen.height * 0.225,Screen.width * 0.3,Screen.height * 0.4),"Typ : Karabin snajperski  |  Ranga : " + Rank2 + " / 5");
					}
					GUI.Label(Rect(Screen.width * 0.4,Screen.height * 0.25,Screen.width * 0.3,Screen.height * 0.4),"Dane broni : " + "\n" + "\n" + "Minimalne obrażenia : " + Slot2[0].ToString("f0") + "\n" + "Maksymalne obrażenia : " + Slot2[1].ToString("f0") + "\n" + "Pojemność magazynka : " + Slot2[2] + "\n" + "Rozrzut : " + Slot2[3].ToString("f2") + " m / 100 m" + "\n" + "Szybkostrzelność : " + Slot2[4].ToString("f2") + "\n" + "Cena : " + Slot2[5].ToString("f0"));
					if(!Wykupiony2)
					{
						if(Ekwipunek.Money >= Slot2[5])
						{
							if(GUI.Button(Rect(Screen.width * 0.4,Screen.height * 0.15,Screen.width * 0.2,Screen.height * 0.05),"Kup"))
							{
								Ekwipunek.AktualnaBronTyp = Typ2;
								Ekwipunek.AktualnaBronMinDmg = Slot2[0];
								Ekwipunek.AktualnaBronMaxDmg = Slot2[1];
								Ekwipunek.AktualnaBronMag = Mathf.Round(Slot2[2]);
								Ekwipunek.AktualnaBronCel = Slot2[3];
								Ekwipunek.AktualnaBronSpd = Slot2[4];
								Ekwipunek.Money -= Slot2[5];
								Ekwipunek.AktualnaBronRank = Rank2;
								Ekwipunek.Zmien = true;
								Wykupiony2 = true;
							}
						}
					}
				}
				if(Wybrany == 3)
				{
					if(Typ3 == "Rewolwer")
					{
						GUI.Label(Rect(Screen.width * 0.4,Screen.height * 0.225,Screen.width * 0.3,Screen.height * 0.4),"Typ : Rewolwer  |  Ranga : " + Rank3 + " / 5");
					}
					if(Typ3 == "Assault")
					{
						GUI.Label(Rect(Screen.width * 0.4,Screen.height * 0.225,Screen.width * 0.3,Screen.height * 0.4),"Typ : Karabin szturmowy  |  Ranga : " + Rank3 + " / 5");
					}
					if(Typ3 == "Sniper")
					{
						GUI.Label(Rect(Screen.width * 0.4,Screen.height * 0.225,Screen.width * 0.3,Screen.height * 0.4),"Typ : Karabin snajperski  |  Ranga : " + Rank3 + " / 5");
					}
					GUI.Label(Rect(Screen.width * 0.4,Screen.height * 0.25,Screen.width * 0.3,Screen.height * 0.4),"Dane broni : " + "\n" + "\n" + "Minimalne obrażenia : " + Slot3[0].ToString("f0") + "\n" + "Maksymalne obrażenia : " + Slot3[1].ToString("f0") + "\n" + "Pojemność magazynka : " + Slot3[2] + "\n" + "Rozrzut : " + Slot3[3].ToString("f2") + " m / 100 m" + "\n" + "Szybkostrzelność : " + Slot3[4].ToString("f2") + "\n" + "Cena : " + Slot3[5].ToString("f0"));
					if(!Wykupiony3)
					{
						if(Ekwipunek.Money >= Slot3[5])
						{
							if(GUI.Button(Rect(Screen.width * 0.4,Screen.height * 0.15,Screen.width * 0.2,Screen.height * 0.05),"Kup"))
							{
								Ekwipunek.AktualnaBronTyp = Typ3;
								Ekwipunek.AktualnaBronMinDmg = Slot3[0];
								Ekwipunek.AktualnaBronMaxDmg = Slot3[1];
								Ekwipunek.AktualnaBronMag = Mathf.Round(Slot3[2]);
								Ekwipunek.AktualnaBronCel = Slot3[3];
								Ekwipunek.AktualnaBronSpd = Slot3[4];
								Ekwipunek.Money -= Slot3[5];
								Ekwipunek.AktualnaBronRank = Rank3;
								Ekwipunek.Zmien = true;
								Wykupiony3 = true;
							}
						}
					}
				}
				if(Wybrany == 4)
				{
					if(Typ4 == "Rewolwer")
					{
						GUI.Label(Rect(Screen.width * 0.4,Screen.height * 0.225,Screen.width * 0.3,Screen.height * 0.4),"Typ : Rewolwer  |  Ranga : " + Rank4 + " / 5");
					}
					if(Typ4 == "Assault")
					{
						GUI.Label(Rect(Screen.width * 0.4,Screen.height * 0.225,Screen.width * 0.3,Screen.height * 0.4),"Typ : Karabin szturmowy  |  Ranga : " + Rank4 + " / 5");
					}
					if(Typ4 == "Sniper")
					{
						GUI.Label(Rect(Screen.width * 0.4,Screen.height * 0.225,Screen.width * 0.3,Screen.height * 0.4),"Typ : Karabin snajperski  |  Ranga : " + Rank4 + " / 5");
					}
					GUI.Label(Rect(Screen.width * 0.4,Screen.height * 0.25,Screen.width * 0.3,Screen.height * 0.4),"Dane broni : " + "\n" + "\n" + "Minimalne obrażenia : " + Slot4[0].ToString("f0") + "\n" + "Maksymalne obrażenia : " + Slot4[1].ToString("f0") + "\n" + "Pojemność magazynka : " + Slot4[2] + "\n" + "Rozrzut : " + Slot4[3].ToString("f2") + " m / 100 m" + "\n" + "Szybkostrzelność : " + Slot4[4].ToString("f2") + "\n" + "Cena : " + Slot4[5].ToString("f0"));
					if(!Wykupiony4)
					{
						if(Ekwipunek.Money >= Slot4[5])
						{
							if(GUI.Button(Rect(Screen.width * 0.4,Screen.height * 0.15,Screen.width * 0.2,Screen.height * 0.05),"Kup"))
							{
								Ekwipunek.AktualnaBronTyp = Typ4;
								Ekwipunek.AktualnaBronMinDmg = Slot4[0];
								Ekwipunek.AktualnaBronMaxDmg = Slot4[1];
								Ekwipunek.AktualnaBronMag = Mathf.Round(Slot4[2]);
								Ekwipunek.AktualnaBronCel = Slot4[3];
								Ekwipunek.AktualnaBronSpd = Slot4[4];
								Ekwipunek.Money -= Slot4[5];
								Ekwipunek.AktualnaBronRank = Rank4;
								Ekwipunek.Zmien = true;
								Wykupiony4 = true;
							}
						}
					}
				}
				if(Wybrany == 5)
				{
					if(Typ5 == "Rewolwer")
					{
						GUI.Label(Rect(Screen.width * 0.4,Screen.height * 0.225,Screen.width * 0.3,Screen.height * 0.4),"Typ : Rewolwer  |  Ranga : " + Rank5 + " / 5");
					}
					if(Typ5 == "Assault")
					{
						GUI.Label(Rect(Screen.width * 0.4,Screen.height * 0.225,Screen.width * 0.3,Screen.height * 0.4),"Typ : Karabin szturmowy  |  Ranga : " + Rank5 + " / 5");
					}
					if(Typ5 == "Sniper")
					{
						GUI.Label(Rect(Screen.width * 0.4,Screen.height * 0.225,Screen.width * 0.3,Screen.height * 0.4),"Typ : Karabin snajperski  |  Ranga : " + Rank5 + " / 5");
					}
					GUI.Label(Rect(Screen.width * 0.4,Screen.height * 0.25,Screen.width * 0.3,Screen.height * 0.4),"Dane broni : " + "\n" + "\n" + "Minimalne obrażenia : " + Slot5[0].ToString("f0") + "\n" + "Maksymalne obrażenia : " + Slot5[1].ToString("f0") + "\n" + "Pojemność magazynka : " + Slot5[2] + "\n" + "Rozrzut : " + Slot5[3].ToString("f2") + " m / 100 m" + "\n" + "Szybkostrzelność : " + Slot5[4].ToString("f2") + "\n" + "Cena : " + Slot5[5].ToString("f0"));
					if(!Wykupiony5)
					{
						if(Ekwipunek.Money >= Slot5[5])
						{
							if(GUI.Button(Rect(Screen.width * 0.4,Screen.height * 0.15,Screen.width * 0.2,Screen.height * 0.05),"Kup"))
							{
								Ekwipunek.AktualnaBronTyp = Typ5;
								Ekwipunek.AktualnaBronMinDmg = Slot5[0];
								Ekwipunek.AktualnaBronMaxDmg = Slot5[1];
								Ekwipunek.AktualnaBronMag = Mathf.Round(Slot5[2]);
								Ekwipunek.AktualnaBronCel = Slot5[3];
								Ekwipunek.AktualnaBronSpd = Slot5[4];
								Ekwipunek.Money -= Slot5[5];
								Ekwipunek.AktualnaBronRank = Rank5;
								Ekwipunek.Zmien = true;
								Wykupiony5 = true;
							}
						}
					}
				}
				if(Wybrany == 6)
				{
					GUI.Label(Rect(Screen.width * 0.4,Screen.height * 0.25,Screen.width * 0.3,Screen.height * 0.4),"Amunicja do rewolwera" + "\n" + "\n" + "Amunicja w ekwipunku : " + Ekwipunek.RewolwerAmmo + "\n" + "Ilość aminicji w jednym pakiecie : 10" + "\n" + "Maksymalna ilość amunicji e ewkipunku : 150" + "\n" + "Cena : " + CenaAmmoRewolwer);
					if(Ekwipunek.Money >= CenaAmmoRewolwer)
					{
						if(Ekwipunek.RewolwerAmmo < 150)
						{
							if(GUI.Button(Rect(Screen.width * 0.4,Screen.height * 0.15,Screen.width * 0.2,Screen.height * 0.05),"Kup"))
							{
								if(Ekwipunek.RewolwerAmmo > 140)
								{
									Ekwipunek.RewolwerAmmo = 150;
									Ekwipunek.Money -= CenaAmmoRewolwer;
								}
								if(Ekwipunek.RewolwerAmmo <= 140)
								{
									Ekwipunek.RewolwerAmmo += 10;
									Ekwipunek.Money -= CenaAmmoRewolwer;
								}
							}
						}
					}
				}
				if(Wybrany == 7)
				{
					GUI.Label(Rect(Screen.width * 0.4,Screen.height * 0.25,Screen.width * 0.3,Screen.height * 0.4),"Amunicja do karabinu snajperskiego" + "\n" + "\n" + "Amunicja w ekwipunku : " + Ekwipunek.SniperAmmo + "\n" + "Ilość aminicji w jednym pakiecie : 5" + "\n" + "Maksymalna ilość amunicji e ewkipunku : 75" + "\n" + "Cena : " + CenaAmmoSniper);
					if(Ekwipunek.Money >= CenaAmmoSniper)
					{
						if(Ekwipunek.SniperAmmo < 75)
						{
							if(GUI.Button(Rect(Screen.width * 0.4,Screen.height * 0.15,Screen.width * 0.2,Screen.height * 0.05),"Kup"))
							{
								if(Ekwipunek.SniperAmmo > 70)
								{
									Ekwipunek.SniperAmmo = 75;
									Ekwipunek.Money -= CenaAmmoSniper;
								}
								if(Ekwipunek.SniperAmmo <= 70)
								{
									Ekwipunek.SniperAmmo += 5;
									Ekwipunek.Money -= CenaAmmoSniper;
								}
							}
						}
					}
				}
				if(Wybrany == 8)
				{
					GUI.Label(Rect(Screen.width * 0.4,Screen.height * 0.25,Screen.width * 0.3,Screen.height * 0.4),"Amunicja do karabinu szturmowego" + "\n" + "\n" + "Amunicja w ekwipunku : " + Ekwipunek.AssaultAmmo + "\n" + "Ilość aminicji w jednym pakiecie : 25" + "\n" + "Maksymalna ilość amunicji e ewkipunku : 300" + "\n" + "Cena : " + CenaAmmoAssault);
					if(Ekwipunek.Money >= CenaAmmoAssault)
					{
						if(Ekwipunek.AssaultAmmo < 300)
						{
							if(GUI.Button(Rect(Screen.width * 0.4,Screen.height * 0.15,Screen.width * 0.2,Screen.height * 0.05),"Kup"))
							{
								if(Ekwipunek.AssaultAmmo > 275)
								{
									Ekwipunek.AssaultAmmo = 300;
									Ekwipunek.Money -= CenaAmmoAssault;
								}
								if(Ekwipunek.AssaultAmmo <= 275)
								{
									Ekwipunek.AssaultAmmo += 25;
									Ekwipunek.Money -= CenaAmmoAssault;
								}
							}
						}
					}
				}
			}				
		}
	}
	if(Pokaz)
	{
		GUI.Label(Rect(Screen.width * 0.4,Screen.height * 0.3,Screen.width * 0.2,Screen.height * 0.1),"Nowe towary w sklepie!",StylNapis);
	}
	if(PokazNot)
	{
		GUI.Label(Rect(Screen.width * 0.4,Screen.height * 0.3,Screen.width * 0.2,Screen.height * 0.1),"Sklpe nieczynny (poczekaj do 30s)",StylNapis);
	}
}





