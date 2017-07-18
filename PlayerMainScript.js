#pragma strict

static var Stats = false;
var StatsIcon : GUIStyle;
var StatsStyle : GUIStyle;
var ExitTexture : GUIStyle;
static var Hp = 0.0;
static var MaxHp = 0.0;
static var Lv = 0;
static var Exp = 0;
static var NextLv = 0;
var PasekHp : GUIStyle;
var ObrysHp : GUIStyle;
var PasekExp : GUIStyle;
var ObrysExp : GUIStyle;
var StylPozycja : GUIStyle;
static var Mozna = false;
var Styl : GUIStyle;
private var Procent = 0.0;
private var ProcentExp = 0.0;
static var Pkt = 0;
static var Str = 0;
static var Agi = 0;
static var Eng = 0;
static var StrPoints = 0;
static var AgiPoints = 0;
static var EngPoints = 0;
static var Defense = 0;
static var Damage = 0;
var PasekBlack : GUIStyle;
private var Juz = false;
var ItemManager : ItemManager;
var Beczka = false;
private var Load = 0;
var LvUp : GameObject;
private var LVUP : GameObject;
var ParticleSystemPosition : Transform;
static var Pozycja = 0;
var PozycjePL : String[];
var PozycjeENG : String[];
static var TeleportStand = false;
static var ObronaPlusSila = 0;
static var Teleport = false;
var StylTeleportButton : GUIStyle;
var TeleportStyle : GUIStyle;
var EmptySlot : GUIStyle;
@HideInInspector var TeleportS : TeleportScript;
var StylNapisy : GUIStyle;
var Obrys : GUIStyle;
static var DodawanieHp = 0;
static var Krytyk = 0;
private var SlotHp = 0;
var StylHpButton : GUIStyle;
var ObrysButton : GUIStyle;
var Zaznaczony : GUIStyle;
var StstsTextStyle : GUIStyle;
var EqStyle : GUIStyle;
private var EscapeS : Escape;
private var PoziomS : PoziomNumber;
private var Poziom = 0;
static var Sekundy = 0.0;
static var Minuty = 0;
static var Godziny = 0;
private var DodawanieCzasu = false;
var DmgReceivedSound : AudioSource;
var LvUpSound : AudioSource;
static var DodawanieMikstura = false;
private var FunkcjaDodawania = false;
private var Timer = 0.0;
var SzybkoscDodawania = 0.0;
var PasekHpPostep : GUIStyle;
private var UstawionoPostep = false;
private var Postep = 0.0;
private var NaSec = 0.0;
static var Dodano = 0;
private var TouchPoint : Vector2;
private var BlokowanieMikstur = false;
var SpellsIcon : GUIStyle;
@HideInInspector var Typ = 0;
private var ShowedDmg = false;
var DmgText : GameObject;

function Awake()
{
	DodawanieCzasu = false;
	Typ = PlayerPrefs.GetInt("PlayerType");
}

function Start()
{
	UstawionoPostep = false;
	Timer = 0.01;
	TeleportStand = false;
	Mozna = true;
	EscapeS = this.gameObject.GetComponent("Escape");
	PoziomS = GameObject.FindWithTag("Poziom").GetComponent("PoziomNumber");
	Poziom = PoziomS.Poziom;
	Load = PlayerPrefs.GetInt("Load");
	Typ = PlayerPrefs.GetInt("PlayerType");
	if(Load == 0)
	{
		Lv = 1;
		Exp = 0;
		Pkt = 0;
		NextLv = Lv * 150;
		if(Typ == 0)
		{
			StrPoints = 10;
			AgiPoints = 5;
			EngPoints = 5;
		}
		if(Typ == 1)
		{
			StrPoints = 5;
			AgiPoints = 10;
			EngPoints = 5;
		}
		if(Typ == 2)
		{
			StrPoints = 5;
			AgiPoints = 5;
			EngPoints = 10;
		}
		DodawanieHp = 0;
		Krytyk = 0;
		MaxHp = (EngPoints * 10) + 45 + (Lv * 5);
		Hp = MaxHp;
		Sekundy = 0.0;
		Minuty = 0.0;
		Godziny = 0.0;
		Pozycja = 2;
		PlayerPrefs.SetInt("WejdeDo",Pozycja);
		Juz = true;
	}
	if(Load == 1)
	{
		Lv = PlayerPrefs.GetInt("Lv");
		Exp = PlayerPrefs.GetInt("Exp");
		Pkt = PlayerPrefs.GetInt("Pkt");
		NextLv = Lv * 150;
		StrPoints = PlayerPrefs.GetInt("StrPoints");
		AgiPoints = PlayerPrefs.GetInt("AgiPoints");
		EngPoints = PlayerPrefs.GetInt("EngPoints");
		MaxHp = (Eng * 10) + 45 + (Lv * 5);
		DodawanieHp = PlayerPrefs.GetInt("DodawanieHp");
		Krytyk = PlayerPrefs.GetInt("Krytyk");
		Hp = PlayerPrefs.GetFloat("Hp");
		Sekundy = PlayerPrefs.GetFloat("Sekundy");
		Minuty = PlayerPrefs.GetInt("Minuty");
		Godziny = PlayerPrefs.GetInt("Godziny");
		Pozycja = PlayerPrefs.GetInt("WejdeDo");
		Juz = true;
	}
	if(Pozycja == 0)
	{
		Pozycja = 2;
	}
	if(Pozycja == 1)
	{
		Pozycja = 2;
	}
	if(Pozycja == 2)
	{
		Pozycja = 2;
	}
	DodawanieCzasu = true;
	Juz = true;
}

function DmgReceived(GetDmg : float)
{
	DmgReceivedSound.Play();
	ShowDmg(GetDmg);
	UstawionoPostep = false;
}

function Update()
{
	Styl.fontSize = Mathf.Round((Screen.width / 50) - 1);
	StstsTextStyle.fontSize = Mathf.Round((Screen.width / 50) - 1);
	NaSec = (0.1 * (MaxHp * 0.25));
	ObronaPlusSila = Mathf.Round(Str / 2);
	var Pozostalo = 0.0;
	if(DodawanieMikstura)
	{
		if(!UstawionoPostep)
		{
			Postep = 0;
			if(Timer > 0)
			{
				if(Dodano == 1)
				{
					Pozostalo = ((((Timer - 5) * -1) * NaSec) * 2) / MaxHp;
				}
				if(Dodano == 2)
				{
					Pozostalo = (((((Timer - 5) * -1) * NaSec) * 2) / MaxHp) + (Dodano * (MaxHp * 0.125) / MaxHp);
				}
				if(Dodano >= 3)
				{
					Pozostalo = (((((Timer - 5) * -1) * NaSec) * 2) / MaxHp) + (Dodano * (MaxHp * 0.1625) / MaxHp);
				}
				Postep = (((MaxHp * 0.25) + Hp) / MaxHp) - ((Pozostalo - 0.25) * -1);
			}
			if(Timer <= 0)
			{
				Postep = ((MaxHp * 0.25) + Hp) / MaxHp;
			}
			if(Postep > 1)
			{
				Postep = 1;
			}
			UstawionoPostep = true;
		}
		if(UstawionoPostep)
		{
			Timer += SzybkoscDodawania * Time.deltaTime;
			if(Dodano == 1)
			{
				if(Timer >= ((10 * SzybkoscDodawania)) * Dodano)
				{
					DodawanieMikstura = false;
				}
			}
			if(Dodano > 1)
			{
				if(Dodano == 2)
				{
					if(Timer >= ((10 * SzybkoscDodawania) + (Dodano * (5 * SzybkoscDodawania))))
					{
						DodawanieMikstura = false;
					}
				}
				else
				{
					if(Timer >= ((10 * SzybkoscDodawania) + (Dodano * (6.5 * SzybkoscDodawania))))
					{
						DodawanieMikstura = false;
					}
				}
			}
			if(Hp < MaxHp)
			{
				Hp += NaSec * Time.deltaTime;
			}
		}
	}
	if(!DodawanieMikstura)
	{
		Dodano = 0;
		Timer = 0.0;
		UstawionoPostep = false;
	}
	if(DodawanieCzasu)
	{
		Sekundy += Time.deltaTime;
		if(Sekundy >= 60)
		{
			Minuty++;
			Sekundy = 0;
		}
		if(Minuty >= 60)
		{
			Godziny++;
			Minuty = 0;
		}
	}
	if(transform.position.y < 0.75)
	{
		transform.position.y += 1.75;
	}
	Str = StrPoints + ItemManager.StrPlus[InventoryScript.Equiped[6]] + ItemManager.StrPlus[InventoryScript.Equiped[7]];
	Agi = AgiPoints + ItemManager.AgiPlus[InventoryScript.Equiped[6]] + ItemManager.AgiPlus[InventoryScript.Equiped[7]];
	Eng = EngPoints + ItemManager.EngPlus[InventoryScript.Equiped[6]] + ItemManager.EngPlus[InventoryScript.Equiped[7]];
	MaxHp = (Eng * 10) + 45 + (Lv * 5);
	if(Exp >= NextLv)
	{
		LvUpSound.Play();
		var LvUP = Instantiate(LvUp,ParticleSystemPosition.position,ParticleSystemPosition.rotation);
		Lv++;
		var l = Lv % 2;
		if(l == 0)
		{
			Spells.Pkt++;
		}
		Pkt += 2;
		MaxHp = (Eng * 10) + 45 + (Lv * 5);
		Hp = MaxHp;
		var Minus = Exp - NextLv;
		Exp = 0;
		NextLv = Lv * 150;
		Exp = Minus;
		Minus = 0;
		DodawanieMikstura = false;
		UstawionoPostep = false;
		Timer = 0.0;
		Dodano = 0;
		LvUP = null;
	}
	if(!InventoryScript.NieZdatnaDoUzytku)
	{
		Defense = ItemManager.Defense[InventoryScript.Equiped[1]] + ItemManager.Defense[InventoryScript.Equiped[2]] + ItemManager.Defense[InventoryScript.Equiped[3]] + ItemManager.Defense[InventoryScript.Equiped[4]] + ItemManager.Defense[InventoryScript.Equiped[5]] + ObronaPlusSila;
		Damage = ItemManager.Damage[InventoryScript.Equiped[0]] + (Str * 2);
	}
	else
	{
		Defense = 0;
		Damage = 0;
	}
}

function OnGUI()
{
	Procent = Hp / MaxHp;
	if(Hp >= MaxHp)
	{
		Hp = MaxHp;
		if(Hp == MaxHp)
		{
			if(Timer > 0)
			{
				DodawanieMikstura = false;
				UstawionoPostep = false;
				Timer = 0.0;
				Dodano = 0;
			}
		}
	}
	if(Hp <= 0)
	{
		LoadingText.Dead = true;
	}
	if(!Stats)
	{
		if(!Escape.Menu)
		{
			if(!InventoryScript.Eq)
			{
				if(!MapScript.Map)
				{
					if(!Teleport)
					{
						if(!Quests.Quests)
						{
							if(!LoadingText.Loading)
							{
								if(!LoadingText.Dead)
								{
									if(!Spells.SpellBook)
									{
										if(!Rewards.RewardMenu)
										{
											if(!PlayerAttackScript.ActivatedSpell)
											{
												if(GUI.Button(Rect(Screen.width * 0.61,Screen.height * 0.01,Screen.width * 0.1,Screen.width * 0.1),"",StatsIcon))
												{
													Stats = true;
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	if(Stats)
	{
		GUI.depth = -1;
		GUI.Box(Rect(Screen.width * 0.5,0,Screen.width * 0.5,Screen.height),"",StatsStyle);
		GUI.depth = 0;
		if(GUI.Button(Rect(Screen.width * 0.95,0,Screen.width * 0.05,Screen.width * 0.05),"",ExitTexture))
		{
			Stats = false;
		}
		if(GUI.Button(Rect(Screen.width * 0.9,(Screen.height * 0.4) - (Screen.width * 0.1),Screen.width * 0.1,Screen.width * 0.1),"",SpellsIcon))
		{
			Spells.Wybrany = -1;
			Spells.SpellBook = true;
			Stats = false;
		}
		if(Settings.Language == 1)
		{
			GUI.Label(Rect(Screen.width * 0.525,Screen.height * 0.01,Screen.width * 0.25,Screen.height * 0.1),"Czas gry : " + Godziny + "h : " + Minuty + "m : " + Sekundy.ToString("f0") + "s",Styl);
			GUI.Label(Rect(Screen.width * 0.525,Screen.height * 0.06,Screen.width * 0.4,Screen.height * 0.1),"Punkty życia : " + Hp.ToString("f0") + " / " + MaxHp + " ( " + (Procent * 100).ToString("f0") + "% ) ",Styl);
			GUI.Label(Rect(Screen.width * 0.525,Screen.height * 0.11,Screen.width * 0.4,Screen.height * 0.1),"Poziom : " + Lv,Styl);
			GUI.Label(Rect(Screen.width * 0.525,Screen.height * 0.16,Screen.width * 0.4,Screen.height * 0.1),"Doświadczenie : " + Exp.ToString("f0") + " / " + NextLv,Styl);
			GUI.Label(Rect(Screen.width * 0.525,Screen.height * 0.21,Screen.width * 0.4,Screen.height * 0.1),"Punkty nauki : " + Pkt,Styl);
			GUI.Label(Rect(Screen.width * 0.525,Screen.height * 0.26,Screen.width * 0.2,Screen.height * 0.1),"Średnie obrażenia : " + Damage + " ( " + (Damage * 0.75).ToString("f0") + " - " + (Damage * 1.25).ToString("f0") + " ) ",Styl);
			GUI.Label(Rect(Screen.width * 0.525,Screen.height * 0.31,Screen.width * 0.2,Screen.height * 0.1),"Obrona : " + Defense,Styl);
			if(Typ == 0)
			{
				GUI.Label(Rect(Screen.width * 0.525,Screen.height * 0.36,Screen.width * 0.2,Screen.height * 0.1),"Typ : Wojownik",Styl);
			}
			if(Typ == 1)
			{
				GUI.Label(Rect(Screen.width * 0.525,Screen.height * 0.36,Screen.width * 0.2,Screen.height * 0.1),"Typ : Łucznik",Styl);
			}
			if(Typ == 2)
			{
				GUI.Label(Rect(Screen.width * 0.525,Screen.height * 0.36,Screen.width * 0.2,Screen.height * 0.1),"Typ : Mag",Styl);
			}
			GUI.Label(Rect(Screen.width * 0.5,Screen.height * 0.4,Screen.width * 0.5,Screen.height * 0.0075),"",PasekBlack);
			GUI.Label(Rect(Screen.width * 0.5,Screen.height * 0.5,Screen.width * 0.25,Screen.height * 0.05),"",Zaznaczony);
			GUI.Label(Rect(Screen.width * 0.525,Screen.height * 0.5,Screen.width * 0.225,Screen.height * 0.05),"Siła : " + Str,StstsTextStyle);
			GUI.Label(Rect(Screen.width * 0.5,Screen.height * 0.6,Screen.width * 0.25,Screen.height * 0.05),"",Zaznaczony);
			GUI.Label(Rect(Screen.width * 0.525,Screen.height * 0.6,Screen.width * 0.225,Screen.height * 0.05),"Zręczność : " + Agi,StstsTextStyle);
			GUI.Label(Rect(Screen.width * 0.5,Screen.height * 0.7,Screen.width * 0.25,Screen.height * 0.05),"",Zaznaczony);
			GUI.Label(Rect(Screen.width * 0.525,Screen.height * 0.7,Screen.width * 0.225,Screen.height * 0.05),"Energia : " + Eng,StstsTextStyle);
			GUI.Label(Rect(Screen.width * 0.5,Screen.height * 0.8,Screen.width * 0.25,Screen.height * 0.05),"",Zaznaczony);
			GUI.Label(Rect(Screen.width * 0.525,Screen.height * 0.8,Screen.width * 0.225,Screen.height * 0.05),"Regeneracja : " + DodawanieHp,StstsTextStyle);
			GUI.Label(Rect(Screen.width * 0.5,Screen.height * 0.9,Screen.width * 0.25,Screen.height * 0.05),"",Zaznaczony);
			GUI.Label(Rect(Screen.width * 0.525,Screen.height * 0.9,Screen.width * 0.4,Screen.height * 0.05),"Cios krytyczny : " + Krytyk,StstsTextStyle);
			GUI.Label(Rect(Screen.width * 0.75,Screen.height * 0.4,Screen.height * 0.0075,Screen.height * 0.6),"",PasekBlack);
			GUI.Label(Rect(Screen.width * 0.76,Screen.height * 0.5,Screen.width * 0.225,Screen.height * 0.05),"Szybkość ataku : " + (2.75 - PlayerMainScript.Agi * 0.05),StstsTextStyle);
			GUI.Label(Rect(Screen.width * 0.76,Screen.height * 0.6,Screen.width * 0.225,Screen.height * 0.05),"Regeneracja : " + (DodawanieHp * 0.1) + "/s",StstsTextStyle);
			GUI.Label(Rect(Screen.width * 0.76,Screen.height * 0.7,Screen.width * 0.225,Screen.height * 0.05),"Cios krytyczny (x2) : " + (Krytyk * 0.5) + "%",StstsTextStyle);
			GUI.Label(Rect(Screen.width * 0.76,Screen.height * 0.8,Screen.width * 0.225,Screen.height * 0.05),"Szybkość chodzenia : " + (Poruszanie.maxSpeed +(PlayerMainScript.Eng * 0.075)),StstsTextStyle);
			GUI.Label(Rect(Screen.width * 0.76,Screen.height * 0.9,Screen.width * 0.225,Screen.height * 0.05),"Szansa na uink : " + (PlayerMainScript.Agi * 0.5) + "%",StstsTextStyle);
		}
		if(Settings.Language == 2)
		{
			GUI.Label(Rect(Screen.width * 0.525,Screen.height * 0.01,Screen.width * 0.25,Screen.height * 0.1),"Play time : " + Godziny + "h : " + Minuty + "m : " + Sekundy.ToString("f0") + "s",Styl);
			GUI.Label(Rect(Screen.width * 0.525,Screen.height * 0.06,Screen.width * 0.4,Screen.height * 0.1),"Health points : " + Hp.ToString("f0") + " / " + MaxHp + " ( " + (Procent * 100).ToString("f0") + "% ) ",Styl);
			GUI.Label(Rect(Screen.width * 0.525,Screen.height * 0.11,Screen.width * 0.4,Screen.height * 0.1),"Level : " + Lv,Styl);
			GUI.Label(Rect(Screen.width * 0.525,Screen.height * 0.16,Screen.width * 0.4,Screen.height * 0.1),"Experience : " + Exp.ToString("f0") + " / " + NextLv,Styl);
			GUI.Label(Rect(Screen.width * 0.525,Screen.height * 0.21,Screen.width * 0.4,Screen.height * 0.1),"Stats points : " + Pkt,Styl);
			GUI.Label(Rect(Screen.width * 0.525,Screen.height * 0.26,Screen.width * 0.2,Screen.height * 0.1),"Average damage : " + Damage + " ( " + (Damage * 0.75).ToString("f0") + " - " + (Damage * 1.25).ToString("f0") + " ) ",Styl);
			GUI.Label(Rect(Screen.width * 0.525,Screen.height * 0.31,Screen.width * 0.2,Screen.height * 0.1),"Defense : " + Defense,Styl);
			if(Typ == 0)
			{
				GUI.Label(Rect(Screen.width * 0.525,Screen.height * 0.36,Screen.width * 0.2,Screen.height * 0.1),"Type : Warrior",Styl);
			}
			if(Typ == 1)
			{
				GUI.Label(Rect(Screen.width * 0.525,Screen.height * 0.36,Screen.width * 0.2,Screen.height * 0.1),"Type : Hunter",Styl);
			}
			if(Typ == 2)
			{
				GUI.Label(Rect(Screen.width * 0.525,Screen.height * 0.36,Screen.width * 0.2,Screen.height * 0.1),"Type : Sorcerer",Styl);
			}
			GUI.Label(Rect(Screen.width * 0.5,Screen.height * 0.4,Screen.width * 0.5,Screen.height * 0.0075),"",PasekBlack);
			GUI.Label(Rect(Screen.width * 0.5,Screen.height * 0.5,Screen.width * 0.25,Screen.height * 0.05),"",Zaznaczony);
			GUI.Label(Rect(Screen.width * 0.525,Screen.height * 0.5,Screen.width * 0.225,Screen.height * 0.05),"Strength : " + Str,StstsTextStyle);
			GUI.Label(Rect(Screen.width * 0.5,Screen.height * 0.6,Screen.width * 0.25,Screen.height * 0.05),"",Zaznaczony);
			GUI.Label(Rect(Screen.width * 0.525,Screen.height * 0.6,Screen.width * 0.225,Screen.height * 0.05),"Dexterity : " + Agi,StstsTextStyle);
			GUI.Label(Rect(Screen.width * 0.5,Screen.height * 0.7,Screen.width * 0.25,Screen.height * 0.05),"",Zaznaczony);
			GUI.Label(Rect(Screen.width * 0.525,Screen.height * 0.7,Screen.width * 0.225,Screen.height * 0.05),"Vitality : " + Eng,StstsTextStyle);
			GUI.Label(Rect(Screen.width * 0.5,Screen.height * 0.8,Screen.width * 0.25,Screen.height * 0.05),"",Zaznaczony);
			GUI.Label(Rect(Screen.width * 0.525,Screen.height * 0.8,Screen.width * 0.225,Screen.height * 0.05),"Regeneration : " + DodawanieHp,StstsTextStyle);
			GUI.Label(Rect(Screen.width * 0.5,Screen.height * 0.9,Screen.width * 0.25,Screen.height * 0.05),"",Zaznaczony);
			GUI.Label(Rect(Screen.width * 0.525,Screen.height * 0.9,Screen.width * 0.4,Screen.height * 0.05),"Critical hit : " + Krytyk,StstsTextStyle);
			GUI.Label(Rect(Screen.width * 0.75,Screen.height * 0.4,Screen.height * 0.0075,Screen.height * 0.6),"",PasekBlack);
			GUI.Label(Rect(Screen.width * 0.775,Screen.height * 0.5,Screen.width * 0.225,Screen.height * 0.05),"Attack speed : " + (2.75 - PlayerMainScript.Agi * 0.05),StstsTextStyle);
			GUI.Label(Rect(Screen.width * 0.775,Screen.height * 0.6,Screen.width * 0.225,Screen.height * 0.05),"Regeneration : " + (DodawanieHp * 0.1) + "/s",StstsTextStyle);
			GUI.Label(Rect(Screen.width * 0.775,Screen.height * 0.7,Screen.width * 0.225,Screen.height * 0.05),"Critical hit (x2) : " + (Krytyk * 0.5) + "%",StstsTextStyle);
			GUI.Label(Rect(Screen.width * 0.775,Screen.height * 0.8,Screen.width * 0.225,Screen.height * 0.05),"Movement speed : " + (Poruszanie.maxSpeed +(PlayerMainScript.Eng * 0.075)),StstsTextStyle);
			GUI.Label(Rect(Screen.width * 0.775,Screen.height * 0.9,Screen.width * 0.225,Screen.height * 0.05),"Chance to dodge : " + (PlayerMainScript.Agi * 0.5) + "%",StstsTextStyle);
		}
		if(Pkt > 0)
		{
			if(GUI.Button(Rect(Screen.width * 0.675,Screen.height * 0.5,Screen.width * 0.05,Screen.height * 0.05),"+"))
			{
				StrPoints++;
				Pkt--;
			}
			if(GUI.Button(Rect(Screen.width * 0.675,Screen.height * 0.6,Screen.width * 0.05,Screen.height * 0.05),"+"))
			{
				AgiPoints++;
				Pkt--;
			}
			if(GUI.Button(Rect(Screen.width * 0.675,Screen.height * 0.7,Screen.width * 0.05,Screen.height * 0.05),"+"))
			{
				EngPoints++;
				MaxHp += 5;
				Hp += 5;
				Pkt--;
			}
			if(GUI.Button(Rect(Screen.width * 0.675,Screen.height * 0.8,Screen.width * 0.05,Screen.height * 0.05),"+"))
			{
				DodawanieHp++;
				Pkt--;
			}
			if(GUI.Button(Rect(Screen.width * 0.675,Screen.height * 0.9,Screen.width * 0.05,Screen.height * 0.05),"+"))
			{
				Krytyk++;
				Pkt--;
			}
		}
	}
	if(!Escape.Menu)
	{
		if(!MapScript.Map)
		{
			if(!LoadingText.Loading)
			{
				if(!LoadingText.Dead)
				{
					if(Mozna)
					{
						if(Settings.Language == 1)
						{
							GUI.Label(Rect(Screen.width * 0.075,Screen.height * 0.01,Screen.width * 0.4,Screen.height * 0.04),PozycjePL[Pozycja],StylPozycja);
						}
						if(Settings.Language == 2)
						{
							GUI.Label(Rect(Screen.width * 0.075,Screen.height * 0.01,Screen.width * 0.4,Screen.height * 0.04),PozycjeENG[Pozycja],StylPozycja);
						}
						GUI.Box(Rect(Screen.width * 0.075,Screen.height * 0.05,(Screen.width * 0.4) * Procent,Screen.height * 0.075),"",PasekHp);
						if(DodawanieMikstura)
						{
							GUI.Box(Rect(Screen.width * 0.075,Screen.height * 0.05,(Screen.width * 0.4) * Postep,Screen.height * 0.075),"",PasekHpPostep);
						}
						GUI.Box(Rect(Screen.width * 0.075,Screen.height * 0.05,Screen.width * 0.4,Screen.height * 0.075),"",ObrysHp);
					}
					if(!PlayerAttackScript.ActivatedSpell)
					{
						GUI.Label(Rect(Screen.width * 0.0125,Screen.height * 0.05,Screen.width * 0.05,Screen.width * 0.05),"",EqStyle);
						GUI.Label(Rect(Screen.width * 0.0125,Screen.height * 0.05,Screen.width * 0.05,Screen.width * 0.05),"",ObrysButton);
						if(InventoryScript.Potions > 0)
						{
							for(var i = 0; i < Input.touchCount; i++)
							{
								if(Input.GetTouch(i).phase == TouchPhase.Began)
								{
									TouchPoint = Input.GetTouch(i).position;
									TouchPoint.y = (TouchPoint.y - Screen.height) * -1;
									if(TouchPoint.x >= Screen.width * 0.0125 && TouchPoint.x <= Screen.width * 0.0675)
									{
										if(TouchPoint.y >= Screen.height * 0.05 && TouchPoint.y <= Screen.height * 0.1)
										{
											if(Hp < MaxHp)
											{
												if(Dodano < 4)
												{
													if(!BlokowanieMikstur)
													{
														this.gameObject.SendMessage("DodawaniePotion",SendMessageOptions.DontRequireReceiver);
														BlokowanieMikstur = true;
													}
												}
											}
										}
									}
								}
								if(BlokowanieMikstur)
								{
									if(Input.GetTouch(i).phase == TouchPhase.Ended)
									{
										TouchPoint = Input.GetTouch(i).position;
										TouchPoint.y = (TouchPoint.y - Screen.height) * -1;
										if(TouchPoint.x >= Screen.width * 0.0125 && TouchPoint.x <= Screen.width * 0.0675)
										{
											if(TouchPoint.y >= Screen.height * 0.05 && TouchPoint.y <= Screen.height * 0.1)
											{
												BlokowanieMikstur = false;
											}
										}
									}
								}
								if(Application.platform == RuntimePlatform.WindowsEditor)
								{
									if(GUI.Button(Rect(Screen.width * 0.0125,Screen.height * 0.05,Screen.width * 0.05,Screen.width * 0.05),"",StylHpButton))
									{
										if(Hp < MaxHp)
										{
											if(Dodano < 4)
											{
												this.gameObject.SendMessage("DodawaniePotion",SendMessageOptions.DontRequireReceiver);
											}
										}
									}
								}
							}
							GUI.Label(Rect(Screen.width * 0.0125,Screen.height * 0.05,Screen.width * 0.05,Screen.width * 0.05),"",StylHpButton);
						}
					}
				}
			}
		}
	}
	if(TeleportStand)
	{
		if(!Teleport)
		{
			if(!InventoryScript.Eq)
			{
				if(!Stats)
				{
					if(!MapScript.Map)
					{
						if(!Escape.Menu)
						{
							if(!Quests.Quests)
							{
								if(!LoadingText.Loading)
								{
									if(!LoadingText.Dead)
									{
										if(!Rewards.RewardMenu)
										{
											if(!PlayerAttackScript.ActivatedSpell)
											{
												GUI.depth = 1;
												if(GUI.Button(Rect(Screen.width * 0.9,(Screen.height * 0.225) + (Screen.width * 0.075),Screen.width * 0.075,Screen.width * 0.075),"",StylTeleportButton))
												{
													TeleportS = GameObject.FindWithTag("Player").GetComponent("TeleportScript");
													Teleport = true;
												}
												GUI.depth = 0;
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	if(Teleport)
	{
		GUI.Box(Rect(Screen.width * 0.5,0,Screen.width * 0.5,Screen.height),"",TeleportStyle);
		if(GUI.Button(Rect(Screen.width * 0.95,0,Screen.width * 0.05,Screen.width * 0.05),"",ExitTexture))
		{
			Teleport = false;
		}
		for(var a = 0; a < TeleportS.Teleports.length; a++)
		{
			if(TeleportS.Teleports[a] > 0)
			{
				GUI.Label(Rect(Screen.width * 0.7,Screen.height * 0.1 + (a * Screen.width * 0.1),Screen.width * 0.2,Screen.height * 0.1),"Teleport : " + TeleportS.TeleportName[a],StylNapisy);
				GUI.Label(Rect(Screen.width * 0.6,Screen.height * 0.1 + (a * Screen.width * 0.1),Screen.width * 0.075,Screen.width * 0.075),"",StylTeleportButton);
				if(GUI.Button(Rect(Screen.width * 0.6,Screen.height * 0.1 + (a * Screen.width * 0.1),Screen.width * 0.3,Screen.width * 0.075),"",Obrys))
				{
					var Tele = (a * 2) + 2;
					for(var sx = 0; sx <= EscapeS.PowtorzZapis; sx++)
					{
						PlayerPrefs.SetFloat("Sekundy", Sekundy);
						PlayerPrefs.SetInt("Minuty", Minuty);
						PlayerPrefs.SetInt("Godziny", Godziny);
						for(var r = 0; r < InventoryScript.Slots.length; r++)
						{
							 PlayerPrefs.SetInt("Slot" + r,InventoryScript.Slots[r]);
						}
						for(var t = 0; t < InventoryScript.Equiped.length; t++)
						{
							 PlayerPrefs.SetInt("Equiped" + t, InventoryScript.Equiped[t]);
						}
						PlayerPrefs.SetFloat("TimerReward",Rewards.Timer);
						PlayerPrefs.SetInt("Potions",InventoryScript.Potions);
						PlayerPrefs.SetInt("Gold", InventoryScript.Gold);
						PlayerPrefs.SetFloat("Hp", PlayerMainScript.Hp);
						PlayerPrefs.SetInt("Lv", PlayerMainScript.Lv);
						PlayerPrefs.SetInt("Exp", PlayerMainScript.Exp);
						PlayerPrefs.SetInt("Pkt", PlayerMainScript.Pkt);
						PlayerPrefs.SetInt("PlayerType", Typ);
						PlayerPrefs.SetInt("SpellPkt", Spells.Pkt);
						PlayerPrefs.SetInt("StrPoints", PlayerMainScript.StrPoints);
						PlayerPrefs.SetInt("AgiPoints", PlayerMainScript.AgiPoints);
						PlayerPrefs.SetInt("EngPoints", PlayerMainScript.EngPoints);
						PlayerPrefs.SetInt("DodawanieHp", PlayerMainScript.DodawanieHp);
						PlayerPrefs.SetInt("Krytyk", PlayerMainScript.Krytyk);
						for(var c = 0; c < Odkrywanie.ScianyCount; c++)
						{
							PlayerPrefs.SetInt("ScianaLv" + Poziom + "Nr" + c, Odkrywanie.IndexSciany[c]);
						}
						for(var v = 0; v < TeleportS.Teleports.length; v++)
						{
							PlayerPrefs.SetInt("Teleport" + v, TeleportS.Teleports[v]);
						}
						for(var z = 0; z < Quests.Zadania.length; z++)
						{
							PlayerPrefs.SetInt("Zadania" + z, Quests.Zadania[z]);
							PlayerPrefs.SetInt("IloscZadania" + z, Quests.IloscZadania[z]);
						}
						PlayerPrefs.SetInt("Wejscie",0);
						PlayerPrefs.SetString("WychodzeZ","");
						PlayerPrefs.SetInt("Teleportacja",1);
						PlayerPrefs.SetInt("WejdeDo",Tele);
						PlayerPrefs.SetInt("Load",1);
					}
					if(sx > EscapeS.PowtorzZapis)
					{
						Teleport = false;
						Application.LoadLevel(Tele);
					}
				}
		
			}
			if(TeleportS.Teleports[a] == 0)
			{
				GUI.Label(Rect(Screen.width * 0.6,Screen.height * 0.1 + (a * Screen.width * 0.1),Screen.width * 0.3,Screen.width * 0.075),"",Obrys);
			}
		}
	}
	if(DodawanieHp > 0)
	{
		Hp += (DodawanieHp * 0.05) * Time.deltaTime;
	}
}


function OnTriggerEnter(other : Collider)
{
	if(other.gameObject.tag == "Teleport")
	{
		TeleportStand = true;
	}
}

function OnTriggerExit(other : Collider)
{
	if(other.gameObject.tag == "Teleport")
	{
		TeleportStand = false;
	}
}

function DodawaniePotion()
{
	Dodano++;
	UstawionoPostep = false;
	DodawanieMikstura = true;
	InventoryScript.Potions--;
}

function ShowDmg(GetDmg : float)
{
	if(GetDmg != 0)
	{
		if(!ShowedDmg)
		{
			var TextDmg1 = Instantiate(DmgText,Vector3(transform.position.x - 0.25,transform.position.y + 2,transform.position.z),transform.rotation);
			var TextX1 = TextDmg1.transform.GetChild(0).GetComponent(TextMesh);
			TextX1.color = Color.red;
			TextX1.fontSize = 40;
			TextX1.text = "-" + GetDmg.ToString("f0");
			yield WaitForSeconds(1);
			TextX1 = null;
			TextDmg1 = null;
			ShowedDmg = false;
		}
	}
	if(GetDmg == 0)
	{
		if(!ShowedDmg)
		{
			var TextDmg2 = Instantiate(DmgText,Vector3(transform.position.x - 0.25,transform.position.y + 2,transform.position.z),transform.rotation);
			var TextX2 = TextDmg2.transform.GetChild(0).GetComponent(TextMesh);
			TextX2.color = Color.red;
			TextX2.fontSize = 40;
			TextX2.text = "Blocked";
			yield WaitForSeconds(1);
			TextX2 = null;
			TextDmg2 = null;
			ShowedDmg = false;
		}
	}
}
		
		
		



