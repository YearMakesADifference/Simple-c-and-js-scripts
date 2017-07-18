#pragma strict

static var Slots : int[] = new int[45];
static var Equiped : int[] = new int[8]; //0 - bron | 1 - zbroja | 2 - hełm | 3 - buty | 4 - rekawice | 5 - Pas | 6 - pierścień | 7 - amulet
static var DodawanyItem = 0; //Index itemu ze skrypttu ItemManager
private var WyrzucanyItem = 0; //Slot który ma zostać pusty
private var IndexWyrzucanyItem = 0; //Index wyrzucanego ze skryptu ItemManager
private var Player : Transform;
static var Eq = false;
var EqStyle : GUIStyle;
var ExitTexture : GUIStyle;
var ThrowTexture : GUIStyle;
var EquipTexture : GUIStyle;
private var slotSize = 0.045; //Pomnoży się z Screen
private var SlotSize = 0.0;
private var WybranySlot = 0;
private var Zmiana = false;
static var Gold = 0;
var ItemManager : ItemManager;
var slotPos : Vector2[];
private var SlotPos : Vector2[] = new Vector2[45];
var EqIcon : GUIStyle;
private var WybranyEquiped = false;
private var Full = false;
var SrodekNapis : GUIStyle;
var EmptySlot : GUIStyle;
var Zaznaczony : GUIStyle;
var UseTexture : GUIStyle;
var Styl : GUIStyle;
private var Wyrzucono = false;
static var DodawaneZloto = 0;
static var OtwieranieSkrzyni = false;
var StylChestButton : GUIStyle;
var TakeTexture : GUIStyle;
private var SkrzynkaGM : GameObject;
static var Skrzynia = false;
static var SkrzyniaSlots : int[];
static var WybranySlotChest = 0;
static var WybranySlotSklep = 0;
private var ChestS : Skrzynia;
private var Pos1 = 0.0;
private var Pos2 = 0.0;
var StylEquiqable : GUIStyle;
static var NieZdatnaDoUzytku = false;
var StylNapis1 : GUIStyle;
var PunktWyrzutu : Transform;
static var RozbijanieBeczki = false;
private var BeczkaGM : GameObject;
var StylBeczkaButton : GUIStyle;
var StylSklepButton : GUIStyle;
var UnEquipTexture : GUIStyle;
var TakeAllIcon : GUIStyle;
var SellTexture : GUIStyle;
var BuyTexture : GUIStyle;
private var Load = 0;
var PunktAtakuMiecz : Transform;
var PunktAtakuLuk : Transform;
private var AktualnaBron : GameObject;
static var BronIluReczna = 0;
private var CosJestSkrzynia = false;
static var WlaczanieSklepu = false;
static var Sklep = false;
private var SklepS : Sklep;
static var SklepGM : GameObject;
var LiniaStrzaluRenderer : Renderer;
var LiniaWidac : Material;
var LiniaNieWidac : Material;
var ChestAudioSource : AudioSource;
var ChestOpen : AudioClip;
var ChestClose : AudioClip;
static var Potions = 0;
private var PotionTexture : GUIStyle;
private var Typ = 0;

function Awake()
{
	Load = PlayerPrefs.GetInt("Load");
}

function Start()
{
	Sklep = false;
	WybranySlotChest = 0;
	Wyrzucono = false;
	WybranyEquiped = false;
	PotionTexture = ItemManager.Textures[2];
	SlotSize = slotSize * Screen.width;
	Player = GameObject.FindWithTag("Player").transform;
	Typ = PlayerPrefs.GetInt("PlayerType");
	if(Load == 1)
	{
		Gold = PlayerPrefs.GetInt("Gold");
		Potions = PlayerPrefs.GetInt("Potions");
		for(var r = 0; r < Slots.length; r++)
		{
			Slots[r] = PlayerPrefs.GetInt("Slot" + r);
		}
		for(var t = 0; t < Equiped.length; t++)
		{
			Equiped[t] = PlayerPrefs.GetInt("Equiped" + t);
		}
	}
	if(Load == 0)
	{
		for(var e = 1; e < Slots.length; e++)
		{
			Slots[e] = 0;
		}
		Potions = 2;
		if(Typ == 0)
		{
			Equiped[0] = 12;
		}
		if(Typ == 1)
		{
			Equiped[0] = 14;
		}
		if(Typ == 2)
		{
			Equiped[0] = 11;
		}
		Equiped[1] = 31;
		Equiped[2] = 41;
		Equiped[3] = 51;
		Equiped[4] = 61;
		Equiped[5] = 71;
		Equiped[6] = 0;
		Equiped[7] = 0;
		Gold = 0;
	}
	if(Equiped[0] == 14 || Equiped[0] == 17 || Equiped[0] == 21 || Equiped[0] == 25 || Equiped[0] == 29)
	{
		LiniaStrzaluRenderer.material = LiniaWidac;
		AktualnaBron = Instantiate(ItemManager.ModeleBron[Equiped[0]],PunktAtakuLuk.position,PunktAtakuLuk.rotation);
		AktualnaBron.transform.parent = PunktAtakuLuk;
	}
	else
	{
		LiniaStrzaluRenderer.material = LiniaNieWidac;
		AktualnaBron = Instantiate(ItemManager.ModeleBron[Equiped[0]],PunktAtakuMiecz.position,PunktAtakuMiecz.rotation);
		AktualnaBron.transform.parent = PunktAtakuMiecz;
	}
}



function WyrzucItem()
{
	IndexWyrzucanyItem = Slots[WyrzucanyItem]; 
	Slots[WyrzucanyItem] = 0;
	WybranySlot = -1;
	var WurzucanyItemModel = Instantiate(ItemManager.Modele[IndexWyrzucanyItem], PunktWyrzutu.position, Quaternion.identity);
	WurzucanyItemModel = null;
	WyrzucanyItem = 0;
	Wyrzucono = true;
}


function OnGUI()
{
	Styl.fontSize = Mathf.Round((Screen.width / 50) - 1);
	StylEquiqable.fontSize = Mathf.Round((Screen.width / 50) - 1);
	if(!Eq)
	{
		if(!Escape.Menu && !PlayerMainScript.Stats && !MapScript.Map && !PlayerMainScript.Teleport && !Quests.Quests && !LoadingText.Loading && !LoadingText.Dead && !Spells.SpellBook && !PlayerAttackScript.ActivatedSpell && !Rewards.RewardMenu)
		{
			if(GUI.Button(Rect(Screen.width * 0.72,Screen.height * 0.01,Screen.width * 0.1,Screen.width * 0.1),"",EqIcon))
			{
				WybranySlot = -1;
				WybranySlotChest = -1;
				WybranyEquiped = false;
				Eq = true;
				for(var l = 0; l < Slots.length; l++)
				{
					SlotPos[l].x = slotPos[l].x * Screen.width;
					SlotPos[l].y = -(slotPos[l].y * Screen.height) + Screen.height;
				}	
			}
		}
	}
	IluRecznaBron();
	if(Settings.Language == 1)
	{
		if(Eq)
		{
			GUI.depth = -1;
			GUI.Box(Rect(Screen.width * 0.5,0,Screen.width * 0.5,Screen.height),"",EqStyle);
			GUI.depth = 0;
			if(GUI.Button(Rect(Screen.width * 0.95,0,Screen.width * 0.05,Screen.width * 0.05),"",ExitTexture))
			{
				if(Skrzynia)
				{
					ChestAudioSource.clip = ChestClose;
					ChestAudioSource.Play();
				}
				Skrzynia = false;
				CosJestSkrzynia = false;
				Sklep = false;
				Eq = false;
			}
			GUI.Label(Rect(Screen.width * 0.5,0,Screen.width * 0.5,Screen.height * 0.075),"Złoto : " + Gold,Styl);
			for(var i = 0; i < Slots.length; i++)
			{
				if(Slots[i] != 0)
				{
					if(GUI.Button(Rect(SlotPos[i].x,SlotPos[i].y,SlotSize,SlotSize),"",ItemManager.Textures[Slots[i]]))
					{
						if(WybranySlot == -1 || WybranySlot != i)
						{
							WybranyEquiped = false;
							WybranySlotChest = -1;
							WybranySlotSklep = -1;
							WybranySlot = i;
							return;
						}
						if(WybranySlot == i)
						{
							WybranySlot = -1;
							return;
						}
						
					}
					if(WybranySlot == i)
					{
						if(GUI.Button(Rect(SlotPos[i].x,SlotPos[i].y,SlotSize,SlotSize),"",ItemManager.Textures[Slots[i]]))
						{
							WybranySlot = -1;
						}
					}
				}
				if(Slots[i] == 0)
				{
					if(WybranySlot == -1)
					{
						GUI.Label(Rect(SlotPos[i].x,SlotPos[i].y,SlotSize,SlotSize),"",EmptySlot);
					}
					if(WybranySlot > -1)
					{
						if(GUI.Button(Rect(SlotPos[i].x,SlotPos[i].y,SlotSize,SlotSize),"",EmptySlot))
						{
							Slots[i] = Slots[WybranySlot];
							Slots[WybranySlot] = 0;
							WybranySlot = -1;
						}
					}
				}
			}
			if(Potions > 0)
			{
				if(!Sklep)
				{
					if(GUI.Button(Rect(Screen.width * 0.525,Screen.height * 0.4,Screen.width * 0.045,Screen.width * 0.045),"",PotionTexture))
					{
						if(PlayerMainScript.Hp < PlayerMainScript.MaxHp)
						{
							if(PlayerMainScript.Dodano < 4)
							{
								this.gameObject.SendMessage("DodawaniePotion",SendMessageOptions.DontRequireReceiver);
							}
						}
					}
				}
				if(Sklep)
				{
					if(GUI.Button(Rect(Screen.width * 0.525,Screen.height * 0.4,Screen.width * 0.045,Screen.width * 0.045),"",PotionTexture))
					{
						Gold += ItemManager.Cost[2] * 0.125;
						Potions--;
						WybranySlot = -1;
						WybranySlotChest = -1;
						WybranySlotSklep = -1;
						return;
					}
				}
				GUI.Label(Rect(Screen.width * 0.525,Screen.height * 0.4,Screen.width * 0.045,Screen.width * 0.045),"",Zaznaczony);
				GUI.Label(Rect(Screen.width * 0.525,Screen.height * 0.335,Screen.width * 0.045,Screen.width * 0.045),"x" + Potions,Styl);
			}
			if(Potions == 0)
			{
				GUI.Label(Rect(Screen.width * 0.525,Screen.height * 0.4,Screen.width * 0.045,Screen.width * 0.045),"",EmptySlot);
			}
			if(Potions < 0)
			{
				Potions = 0;
			}
			for(var p = 0; p < Equiped.length; p++)
			{
				if(Equiped[p] == 0)
				{
					GUI.Label(Rect((slotPos[p].x * Screen.width) + (Screen.width * 0.05) - (0.0225 * Screen.width),Screen.height * 0.1,SlotSize,SlotSize),"",EmptySlot);
				}
				if(Equiped[p] != 0)
				{
					if(GUI.Button(Rect((slotPos[p].x * Screen.width) + (Screen.width * 0.05) - (0.0225 * Screen.width),Screen.height * 0.1,SlotSize,SlotSize),"",ItemManager.Textures[Equiped[p]]))
					{
						if(!WybranyEquiped || WybranyEquiped && WybranySlot != p)
						{
							WybranySlotSklep = -1;
							WybranySlotChest = -1;
							WybranySlot = p;
							WybranyEquiped = true;
							return;
						}
						if(WybranyEquiped && WybranySlot == p)
						{
							WybranySlotSklep = -1;
							WybranySlotChest = -1;
							WybranySlot = -1;
							WybranyEquiped = false;
							return;
						}
					}
				}
			}
		if(Skrzynia)
		{
			GUI.depth = -1;
			GUI.Box(Rect(Screen.width * 0.1,Screen.height * 0.1,Screen.width * 0.35,Screen.height * 0.8),"",EqStyle);
			GUI.depth = 0;
			for(var x = 0; x < 12; x++)
			{
				if(ChestS.Slots[x] != 0)
				{
					if(x < 6)
					{
						Pos1 = (x - (0.45 * x)) / 10;
						if(GUI.Button(Rect(Screen.width * (0.11 + Pos1),Screen.height * 0.15,SlotSize,SlotSize),"",ItemManager.Textures[ChestS.Slots[x]]))
						{
							WybranySlot = -1;
							WybranyEquiped = false;
							WybranySlotChest = x;
						}
					}
					if(x >= 6 && x <= 11)
					{
						Pos2 = (((x - 6) - (0.45 * (x - 6)))) / 10;
						if(GUI.Button(Rect(Screen.width * (0.11 + Pos2),Screen.height * 0.25,SlotSize,SlotSize),"",ItemManager.Textures[ChestS.Slots[x]]))
						{
							WybranySlot = -1;
							WybranyEquiped = false;
							WybranySlotChest = x;
						}
					}
				}
				if(ChestS.Slots[x] == 0)
				{
					if(x < 6)
					{
						Pos1 = (x - (0.45 * x)) / 10;
						GUI.Label(Rect(Screen.width * (0.11 + Pos1),Screen.height * 0.15,SlotSize,SlotSize),"",EmptySlot);
					}
					if(x >= 6 && x <= 11)
					{
						Pos2 = (((x - 6) - (0.45 * (x - 6)))) / 10;
						GUI.Label(Rect(Screen.width * (0.11 + Pos2),Screen.height * 0.25,SlotSize,SlotSize),"",EmptySlot);
					}
				}
			}
			if(CosJestSkrzynia)
			{
				if(GUI.Button(Rect(Screen.width * 0.375,Screen.height * 0.7,SlotSize,SlotSize),"",TakeAllIcon))
				{
					for(var b = 0; b < ChestS.Slots.length; b++)
					{
						if(ChestS.Slots[b] > 0)
						{
							if(ChestS.Slots[b] == 1)
							{
								Gold += ChestS.Zloto[b];
								ChestS.Zloto[b] = 0;
								ChestS.Slots[b] = 0;
							}
							if(ChestS.Slots[b] == 2)
							{
								Potions++;
								Quests.IloscZadania[6]++;
								ChestS.Slots[b] = 0;
							}
							if(ChestS.Slots[b] >= 3)
							{
								for(var c = 0; c < Slots.length; c++)
								{
									if(Slots[c] == 0)
									{
										Slots[c] = ChestS.Slots[b];
										if(ChestS.Slots[b] != 0)
										{
											Quests.IloscZadania[6]++;
										}
										ChestS.Slots[b] = 0;
									}
								}
							}
							CosJestSkrzynia = false;
						}
					}
				}
			}
			if(WybranySlotChest > -1)
			{
				if(WybranySlotChest < 6)
				{
					var Pos3 = (WybranySlotChest - (0.45 * WybranySlotChest)) / 10;
					GUI.Button(Rect(Screen.width * (0.11 + Pos3),Screen.height * 0.15,SlotSize,SlotSize),"",Zaznaczony);
				}
				if(WybranySlotChest >= 6 && WybranySlotChest <= 11)
				{
					var Pos4 = (((WybranySlotChest - 6) - (0.45 * (WybranySlotChest - 6)))) / 10;
					GUI.Button(Rect(Screen.width * (0.11 + Pos4),Screen.height * 0.25,SlotSize,SlotSize),"",Zaznaczony);
				}
				if(ChestS.Slots[WybranySlotChest] == 1)
				{
					GUI.Label(Rect(Screen.width * 0.1,Screen.height * 0.35,Screen.width * 0.35,Screen.height * 0.3),"Nazwa : " + ItemManager.NazwaPL[ChestS.Slots[WybranySlotChest]] + "\n" + "Typ : " + ItemManager.TypeNamePL[ChestS.Slots[WybranySlotChest]] + "\n" + "Ilość : "
					+ ChestS.Zloto[WybranySlotChest],Styl);
				}
				if(ChestS.Slots[WybranySlotChest] > 1 && ChestS.Slots[WybranySlotChest] <= 10)
				{
					GUI.Label(Rect(Screen.width * 0.1,Screen.height * 0.35,Screen.width * 0.35,Screen.height * 0.3),"Nazwa : " + ItemManager.NazwaPL[ChestS.Slots[WybranySlotChest]] + "\n" + "Typ : " + ItemManager.TypeNamePL[ChestS.Slots[WybranySlotChest]] + "\n" + "Cena(kupna) : " + ItemManager.Cost[ChestS.Slots[WybranySlotChest]],Styl);
				}
				if(ChestS.Slots[WybranySlotChest] > 10 && ChestS.Slots[WybranySlotChest] <= 30)
				{
					GUI.Label(Rect(Screen.width * 0.1,Screen.height * 0.35,Screen.width * 0.35,Screen.height * 0.3),"Nazwa : " + ItemManager.NazwaPL[ChestS.Slots[WybranySlotChest]] + "\n" + "Typ : " + ItemManager.TypeNamePL[ChestS.Slots[WybranySlotChest]] + "\n" + "Wymagana siła : " + ItemManager.ReqStr[ChestS.Slots[WybranySlotChest]] + "\n" + "Wymagana zręczność : " + ItemManager.ReqAgi[ChestS.Slots[WybranySlotChest]] + "\n" + "Obrażenia : " + ItemManager.Damage[ChestS.Slots[WybranySlotChest]] + "\n" + "Cena(kupna) : " + ItemManager.Cost[ChestS.Slots[WybranySlotChest]],Styl);
				}
				if(ChestS.Slots[WybranySlotChest] > 30 && ChestS.Slots[WybranySlotChest] <= 80)
				{
					GUI.Label(Rect(Screen.width * 0.1,Screen.height * 0.35,Screen.width * 0.35,Screen.height * 0.3),"Nazwa : " + ItemManager.NazwaPL[ChestS.Slots[WybranySlotChest]] + "\n" + "Typ : " + ItemManager.TypeNamePL[ChestS.Slots[WybranySlotChest]] + "\n" + "Wymagana siła : " + ItemManager.ReqStr[ChestS.Slots[WybranySlotChest]] + "\n" + "Obrona : " + ItemManager.Defense[ChestS.Slots[WybranySlotChest]] + "\n" + "Cena(kupna) : " + ItemManager.Cost[ChestS.Slots[WybranySlotChest]],Styl);
				}
				if(ChestS.Slots[WybranySlotChest] > 80 && ChestS.Slots[WybranySlotChest] <= 100)
				{
					GUI.Label(Rect(Screen.width * 0.1,Screen.height * 0.35,Screen.width * 0.35,Screen.height * 0.3),"Nazwa : " + ItemManager.NazwaPL[ChestS.Slots[WybranySlotChest]] + "\n" + "Typ : " + ItemManager.TypeNamePL[ChestS.Slots[WybranySlotChest]] + "\n" + "Plus do siły : " + ItemManager.StrPlus[ChestS.Slots[WybranySlotChest]] + "\n" + "Plus do zręczności : " + ItemManager.AgiPlus[ChestS.Slots[WybranySlotChest]] + "\n" + "Plus do żywotności : " + ItemManager.EngPlus[ChestS.Slots[WybranySlotChest]] + "\n" + "Cena(kupna) : " + ItemManager.Cost[ChestS.Slots[WybranySlotChest]],Styl);
				}
				if(ChestS.Slots[WybranySlotChest] > 1)
				{
					if(ChestS.Slots[WybranySlotChest] == 2)
					{
						if(GUI.Button(Rect(Screen.width * 0.235,Screen.height * 0.7,Screen.width * 0.075,Screen.width * 0.075),"",TakeTexture))
						{
							Potions++;
							Quests.IloscZadania[6]++;
							ChestS.Slots[WybranySlotChest] = 0;
						}
					}
					if(ChestS.Slots[WybranySlotChest] > 2)
					{
						if(GUI.Button(Rect(Screen.width * 0.235,Screen.height * 0.7,Screen.width * 0.075,Screen.width * 0.075),"",TakeTexture))
						{
							for(var u = 0; u < Slots.length; u++)
							{
								if(Slots[u] == 0)
								{
									Slots[u] = ChestS.Slots[WybranySlotChest];
									if(ChestS.Slots[WybranySlotChest] != 0)
									{
										Quests.IloscZadania[6]++;
									}
									ChestS.Slots[WybranySlotChest] = 0;
								}
							}
						}
					}
				}
				if(ChestS.Slots[WybranySlotChest] == 1)
				{
					if(GUI.Button(Rect(Screen.width * 0.235,Screen.height * 0.7,Screen.width * 0.075,Screen.width * 0.075),"",TakeTexture))
					{
						Gold += ChestS.Zloto[WybranySlotChest];
						ChestS.Slots[WybranySlotChest] = 0;
					}
				}
			}
		}
		if(Sklep)
		{
			GUI.depth = -1;
			GUI.Box(Rect(Screen.width * 0.1,Screen.height * 0.1,Screen.width * 0.35,Screen.height * 0.8),"",EqStyle);
			GUI.depth = 0;
			for(var cd = 0; cd < 12; cd++)
			{
				if(SklepS.Slots[cd] != 0)
				{
					if(cd < 6)
					{
						Pos1 = (cd - (0.45 * cd)) / 10;
						if(GUI.Button(Rect(Screen.width * (0.11 + Pos1),Screen.height * 0.15,SlotSize,SlotSize),"",ItemManager.Textures[SklepS.Slots[cd]]))
						{
							WybranyEquiped = false;
							WybranySlot = -1;
							WybranySlotChest = -1;
							WybranySlotSklep = cd;
						}
					}
					if(cd >= 6 && cd <= 11)
					{
						Pos2 = (((cd - 6) - (0.45 * (cd - 6)))) / 10;
						if(GUI.Button(Rect(Screen.width * (0.11 + Pos2),Screen.height * 0.25,SlotSize,SlotSize),"",ItemManager.Textures[SklepS.Slots[cd]]))
						{
							WybranyEquiped = false;
							WybranySlotChest = -1;
							WybranySlot = -1;
							WybranySlotSklep = cd;
						}
					}
				}
				if(SklepS.Slots[cd] == 0)
				{
					if(cd < 6)
					{
						Pos1 = (cd - (0.45 * cd)) / 10;
						GUI.Label(Rect(Screen.width * (0.11 + Pos1),Screen.height * 0.15,SlotSize,SlotSize),"",EmptySlot);
					}
					if(cd >= 6 && cd <= 11)
					{
						Pos2 = (((cd - 6) - (0.45 * (cd - 6)))) / 10;
						GUI.Label(Rect(Screen.width * (0.11 + Pos2),Screen.height * 0.25,SlotSize,SlotSize),"",EmptySlot);
					}
				}
			}
			if(WybranySlotSklep > -1)
			{
				if(WybranySlotSklep < 6)
				{
					var Pos5 = (WybranySlotSklep - (0.45 * WybranySlotSklep)) / 10;
					GUI.Button(Rect(Screen.width * (0.11 + Pos5),Screen.height * 0.15,SlotSize,SlotSize),"",Zaznaczony);
				}
				if(WybranySlotSklep >= 6 && WybranySlotSklep <= 11)
				{
					var Pos6 = (((WybranySlotSklep - 6) - (0.45 * (WybranySlotSklep - 6)))) / 10;
					GUI.Button(Rect(Screen.width * (0.11 + Pos6),Screen.height * 0.25,SlotSize,SlotSize),"",Zaznaczony);
				}
				if(SklepS.Slots[WybranySlotSklep] > 1 && SklepS.Slots[WybranySlotSklep] <= 10)
				{
					GUI.Label(Rect(Screen.width * 0.1,Screen.height * 0.35,Screen.width * 0.35,Screen.height * 0.3),"Nazwa : " + ItemManager.NazwaPL[SklepS.Slots[WybranySlotSklep]] + "\n" + "Typ : " + ItemManager.TypeNamePL[SklepS.Slots[WybranySlotSklep]] + "\n" + "Cena(kupna) : " + ItemManager.Cost[SklepS.Slots[WybranySlotSklep]],Styl);
				}
				if(SklepS.Slots[WybranySlotSklep] > 10 && SklepS.Slots[WybranySlotSklep] <= 30)
				{
					if(ItemManager.ReqStr[SklepS.Slots[WybranySlotSklep]] <= PlayerMainScript.Str && ItemManager.ReqAgi[SklepS.Slots[WybranySlotSklep]] <= PlayerMainScript.Agi)
					{
						GUI.Label(Rect(Screen.width * 0.1,Screen.height * 0.35,Screen.width * 0.35,Screen.height * 0.3),"Nazwa : " + ItemManager.NazwaPL[SklepS.Slots[WybranySlotSklep]] + "\n" + "Typ : " + ItemManager.TypeNamePL[SklepS.Slots[WybranySlotSklep]] + "\n" + "Wymagana siła : " + ItemManager.ReqStr[SklepS.Slots[WybranySlotSklep]] + "\n" + "Wymagana zręczność : " + ItemManager.ReqAgi[SklepS.Slots[WybranySlotSklep]] + "\n" + "Obrażenia : " + ItemManager.Damage[SklepS.Slots[WybranySlotSklep]] + "\n" + "Cena(kupna) : " + ItemManager.Cost[SklepS.Slots[WybranySlotSklep]],Styl);
					}
					if(ItemManager.ReqStr[SklepS.Slots[WybranySlotSklep]] > PlayerMainScript.Str || ItemManager.ReqAgi[SklepS.Slots[WybranySlotSklep]] > PlayerMainScript.Agi)
					{
						GUI.Label(Rect(Screen.width * 0.1,Screen.height * 0.35,Screen.width * 0.35,Screen.height * 0.3),"Nazwa : " + ItemManager.NazwaPL[SklepS.Slots[WybranySlotSklep]] + "\n" + "Typ : " + ItemManager.TypeNamePL[SklepS.Slots[WybranySlotSklep]] + "\n" + "Wymagana siła : " + ItemManager.ReqStr[SklepS.Slots[WybranySlotSklep]] + "\n" + "Wymagana zręczność : " + ItemManager.ReqAgi[SklepS.Slots[WybranySlotSklep]] + "\n" + "Obrażenia : " + ItemManager.Damage[SklepS.Slots[WybranySlotSklep]] + "\n" + "Cena(kupna) : " + ItemManager.Cost[SklepS.Slots[WybranySlotSklep]],StylEquiqable);
					}
				}
				if(SklepS.Slots[WybranySlotSklep] > 30 && SklepS.Slots[WybranySlotSklep] <= 80)
				{
					if(ItemManager.ReqStr[SklepS.Slots[WybranySlotSklep]] <= PlayerMainScript.Str)
					{
						GUI.Label(Rect(Screen.width * 0.1,Screen.height * 0.35,Screen.width * 0.35,Screen.height * 0.3),"Nazwa : " + ItemManager.NazwaPL[SklepS.Slots[WybranySlotSklep]] + "\n" + "Typ : " + ItemManager.TypeNamePL[SklepS.Slots[WybranySlotSklep]] + "\n" + "Wymagana siła : " + ItemManager.ReqStr[SklepS.Slots[WybranySlotSklep]] + "\n" + "Obrona : " + ItemManager.Defense[SklepS.Slots[WybranySlotSklep]] + "\n" + "Cena(kupna) : " + ItemManager.Cost[SklepS.Slots[WybranySlotSklep]],Styl);
					}
					if(ItemManager.ReqStr[SklepS.Slots[WybranySlotSklep]] > PlayerMainScript.Str)
					{
						GUI.Label(Rect(Screen.width * 0.1,Screen.height * 0.35,Screen.width * 0.35,Screen.height * 0.3),"Nazwa : " + ItemManager.NazwaPL[SklepS.Slots[WybranySlotSklep]] + "\n" + "Typ : " + ItemManager.TypeNamePL[SklepS.Slots[WybranySlotSklep]] + "\n" + "Wymagana siła : " + ItemManager.ReqStr[SklepS.Slots[WybranySlotSklep]] + "\n" + "Obrona : " + ItemManager.Defense[SklepS.Slots[WybranySlotSklep]] + "\n" + "Cena(kupna) : " + ItemManager.Cost[SklepS.Slots[WybranySlotSklep]],StylEquiqable);
					}
				}
				if(SklepS.Slots[WybranySlotSklep] > 80 && SklepS.Slots[WybranySlotSklep] <= 100)
				{
					GUI.Label(Rect(Screen.width * 0.1,Screen.height * 0.35,Screen.width * 0.35,Screen.height * 0.3),"Nazwa : " + ItemManager.NazwaPL[SklepS.Slots[WybranySlotSklep]] + "\n" + "Typ : " + ItemManager.TypeNamePL[SklepS.Slots[WybranySlotSklep]] + "\n" + "Plus do siły : " + ItemManager.StrPlus[SklepS.Slots[WybranySlotSklep]] + "\n" + "Plus do zręczności : " + ItemManager.AgiPlus[SklepS.Slots[WybranySlotSklep]] + "\n" + "Plus do żywotności : " + ItemManager.EngPlus[SklepS.Slots[WybranySlotSklep]] + "\n" + "Cena(kupna) : " + ItemManager.Cost[SklepS.Slots[WybranySlotSklep]],Styl);
				}
				if(WybranySlotSklep > -1)
				{
					if(Gold >= ItemManager.Cost[SklepS.Slots[WybranySlotSklep]])
					{
						if(SklepS.Slots[WybranySlotSklep] == 2)
						{
							if(GUI.Button(Rect(Screen.width * 0.235,Screen.height * 0.7,Screen.width * 0.075,Screen.width * 0.075),"",BuyTexture))
							{
								Gold -= ItemManager.Cost[SklepS.Slots[WybranySlotSklep]];
								Quests.IloscZadania[13] += ItemManager.Cost[SklepS.Slots[WybranySlotSklep]];
								SklepS.Slots[WybranySlotSklep] = 0;
								WybranySlotChest = -1;
								WybranySlotSklep = -1;
								WybranySlot = -1;
								Potions++;
							}
						}
						else
						{
							for(var de = 0; de < Slots.length; de++)
							{
								if(Slots[de] == 0)
								{
									if(GUI.Button(Rect(Screen.width * 0.235,Screen.height * 0.7,Screen.width * 0.075,Screen.width * 0.075),"",BuyTexture))
									{
										Gold -= ItemManager.Cost[SklepS.Slots[WybranySlotSklep]];
										Quests.IloscZadania[13] += ItemManager.Cost[SklepS.Slots[WybranySlotSklep]];
										Slots[de] = SklepS.Slots[WybranySlotSklep];
										SklepS.Slots[WybranySlotSklep] = 0;
										WybranySlotChest = -1;
										WybranySlotSklep = -1;
										WybranySlot = -1;
										WybranyEquiped = false;
									}
								}
							}
						}
					}
				}
			}
		}
			if(WybranySlot > -1 || WybranyEquiped)
			{
				if(!WybranyEquiped)
				{
					GUI.depth = -2;
					GUI.Button(Rect(SlotPos[WybranySlot].x,SlotPos[WybranySlot].y,SlotSize,SlotSize),"",Zaznaczony);
					GUI.depth = 1;
					if(ItemManager.Type[Slots[WybranySlot]] == 8)
					{
						if(Slots[WybranySlot] == 2)
						{
							if(PlayerMainScript.Hp < PlayerMainScript.MaxHp)
							{
								if(GUI.Button(Rect(Screen.width * 0.9,Screen.height * 0.35,Screen.width * 0.075,Screen.width * 0.075),"",UseTexture))
								{
									PlayerMainScript.Hp += PlayerMainScript.MaxHp * 0.25;
									Slots[WybranySlot] = 0;
									WybranySlot = -1;
									WybranySlotChest = -1;
									return;
								}
							}
							GUI.depth = -2;
							GUI.Button(Rect(SlotPos[WybranySlot].x,SlotPos[WybranySlot].y,SlotSize,SlotSize),"",Zaznaczony);
							GUI.depth = 1;		
							if(!Sklep)
							{
								GUI.Label(Rect(Screen.width * 0.55,Screen.height * 0.2,Screen.width * 0.4,Screen.height * 0.2),"Nazwa : " + ItemManager.NazwaPL[Slots[WybranySlot]] + "\n" + "Typ : " + ItemManager.TypeNamePL[Slots[WybranySlot]] + "\n" + "Cena(kupna) : " + ItemManager.Cost[Slots[WybranySlot]],Styl);
							}
							if(Sklep)
							{
								GUI.Label(Rect(Screen.width * 0.55,Screen.height * 0.2,Screen.width * 0.4,Screen.height * 0.2),"Nazwa : " + ItemManager.NazwaPL[Slots[WybranySlot]] + "\n" + "Typ : " + ItemManager.TypeNamePL[Slots[WybranySlot]] + "\n" + "Cena(sprzedarzy) : " + Mathf.Round((ItemManager.Cost[Slots[WybranySlot]] * 0.125)),Styl);
							}
							GUI.depth = 0;
						}
						if(Slots[WybranySlot] == 3)
						{
							if(GUI.Button(Rect(Screen.width * 0.9,Screen.height * 0.35,Screen.width * 0.075,Screen.width * 0.075),"",UseTexture))
							{
								PlayerMainScript.StrPoints += 1;
								Quests.IloscZadania[10]++;
								Slots[WybranySlot] = 0;
								WybranySlot = -1;
								WybranySlotChest = -1;
								return;
							}
							GUI.depth = -2;
							GUI.Button(Rect(SlotPos[WybranySlot].x,SlotPos[WybranySlot].y,SlotSize,SlotSize),"",Zaznaczony);
							GUI.depth = 1;				
							if(!Sklep)
							{
								GUI.Label(Rect(Screen.width * 0.55,Screen.height * 0.2,Screen.width * 0.4,Screen.height * 0.2),"Nazwa : " + ItemManager.NazwaPL[Slots[WybranySlot]] + "\n" + "Typ : " + ItemManager.TypeNamePL[Slots[WybranySlot]] + "\n" + "Cena(kupna) : " + ItemManager.Cost[Slots[WybranySlot]],Styl);
							}
							if(Sklep)
							{
								GUI.Label(Rect(Screen.width * 0.55,Screen.height * 0.2,Screen.width * 0.4,Screen.height * 0.2),"Nazwa : " + ItemManager.NazwaPL[Slots[WybranySlot]] + "\n" + "Typ : " + ItemManager.TypeNamePL[Slots[WybranySlot]] + "\n" + "Cena(sprzedarzy) : " + (ItemManager.Cost[Slots[WybranySlot]] * 0.125),Styl);
							}
							GUI.depth = 0;
						}
						if(Slots[WybranySlot] == 4)
						{
							if(GUI.Button(Rect(Screen.width * 0.9,Screen.height * 0.35,Screen.width * 0.075,Screen.width * 0.075),"",UseTexture))
							{
								PlayerMainScript.AgiPoints += 1;
								Quests.IloscZadania[10]++;
								Slots[WybranySlot] = 0;
								WybranySlot = -1;
								WybranySlotChest = -1;
								return;
							}
							GUI.depth = -2;
							GUI.Button(Rect(SlotPos[WybranySlot].x,SlotPos[WybranySlot].y,SlotSize,SlotSize),"",Zaznaczony);
							GUI.depth = 1;				
							if(!Sklep)
							{
								GUI.Label(Rect(Screen.width * 0.55,Screen.height * 0.2,Screen.width * 0.4,Screen.height * 0.2),"Nazwa : " + ItemManager.NazwaPL[Slots[WybranySlot]] + "\n" + "Typ : " + ItemManager.TypeNamePL[Slots[WybranySlot]] + "\n" + "Cena(kupna) : " + ItemManager.Cost[Slots[WybranySlot]],Styl);
							}
							if(Sklep)
							{
								GUI.Label(Rect(Screen.width * 0.55,Screen.height * 0.2,Screen.width * 0.4,Screen.height * 0.2),"Nazwa : " + ItemManager.NazwaPL[Slots[WybranySlot]] + "\n" + "Typ : " + ItemManager.TypeNamePL[Slots[WybranySlot]] + "\n" + "Cena(sprzedarzy) : " + Mathf.Round((ItemManager.Cost[Slots[WybranySlot]] * 0.125)),Styl);
							}
							GUI.depth = 0;
						}
						if(Slots[WybranySlot] == 5)
						{
							if(GUI.Button(Rect(Screen.width * 0.9,Screen.height * 0.35,Screen.width * 0.075,Screen.width * 0.075),"",UseTexture))
							{
								PlayerMainScript.EngPoints += 1;
								PlayerMainScript.Hp += 10;
								Quests.IloscZadania[10]++;
								Slots[WybranySlot] = 0;
								WybranySlot = -1;
								WybranySlotChest = -1;
								return;
							}
							GUI.depth = -2;
							GUI.Button(Rect(SlotPos[WybranySlot].x,SlotPos[WybranySlot].y,SlotSize,SlotSize),"",Zaznaczony);
							GUI.depth = 1;				
							if(!Sklep)
							{
								GUI.Label(Rect(Screen.width * 0.55,Screen.height * 0.2,Screen.width * 0.4,Screen.height * 0.2),"Nazwa : " + ItemManager.NazwaPL[Slots[WybranySlot]] + "\n" + "Typ : " + ItemManager.TypeNamePL[Slots[WybranySlot]] + "\n" + "Cena(kupna) : " + ItemManager.Cost[Slots[WybranySlot]],Styl);
							}
							if(Sklep)
							{
								GUI.Label(Rect(Screen.width * 0.55,Screen.height * 0.2,Screen.width * 0.4,Screen.height * 0.2),"Nazwa : " + ItemManager.NazwaPL[Slots[WybranySlot]] + "\n" + "Typ : " + ItemManager.TypeNamePL[Slots[WybranySlot]] + "\n" + "Cena(sprzedarzy) : " + Mathf.Round((ItemManager.Cost[Slots[WybranySlot]] * 0.125)),Styl);
							}
							GUI.depth = 0;
						}
						if(Slots[WybranySlot] == 6)
						{
							if(GUI.Button(Rect(Screen.width * 0.9,Screen.height * 0.35,Screen.width * 0.075,Screen.width * 0.075),"",UseTexture))
							{
								PlayerMainScript.Exp += PlayerMainScript.NextLv * 0.1;
								Slots[WybranySlot] = 0;
								WybranySlot = -1;
								WybranySlotChest = -1;
								return;
							}
							GUI.depth = -2;
							GUI.Button(Rect(SlotPos[WybranySlot].x,SlotPos[WybranySlot].y,SlotSize,SlotSize),"",Zaznaczony);
							GUI.depth = 1;				
							if(!Sklep)
							{
								GUI.Label(Rect(Screen.width * 0.55,Screen.height * 0.2,Screen.width * 0.4,Screen.height * 0.2),"Nazwa : " + ItemManager.NazwaPL[Slots[WybranySlot]] + "\n" + "Typ : " + ItemManager.TypeNamePL[Slots[WybranySlot]] + "\n" + "Cena(kupna) : " + ItemManager.Cost[Slots[WybranySlot]],Styl);
							}
							if(Sklep)
							{
								GUI.Label(Rect(Screen.width * 0.55,Screen.height * 0.2,Screen.width * 0.4,Screen.height * 0.2),"Nazwa : " + ItemManager.NazwaPL[Slots[WybranySlot]] + "\n" + "Typ : " + ItemManager.TypeNamePL[Slots[WybranySlot]] + "\n" + "Cena(sprzedarzy) : " + Mathf.Round((ItemManager.Cost[Slots[WybranySlot]] * 0.125)),Styl);
							}
							GUI.depth = 0;
						}
					}
					if(ItemManager.Type[Slots[WybranySlot]] == 0)
					{
						if(ItemManager.ReqStr[Slots[WybranySlot]] <= PlayerMainScript.Str && ItemManager.ReqAgi[Slots[WybranySlot]] <= PlayerMainScript.Agi)
						{
							if(!Sklep)
							{
								GUI.Label(Rect(Screen.width * 0.55,Screen.height * 0.2,Screen.width * 0.4,Screen.height * 0.2),"Nazwa : " + ItemManager.NazwaPL[Slots[WybranySlot]] + "\n" + "Typ : " + ItemManager.TypeNamePL[Slots[WybranySlot]] + "\n" + "Wymagana siła : " + ItemManager.ReqStr[Slots[WybranySlot]] + "\n" + "Wymagana zręczność : " + ItemManager.ReqAgi[Slots[WybranySlot]] + "\n" + "Obrażenia : " + ItemManager.Damage[Slots[WybranySlot]] + "\n" + "Cena(kupna) : " + ItemManager.Cost[Slots[WybranySlot]],Styl);
							}
							if(Sklep)
							{
								GUI.Label(Rect(Screen.width * 0.55,Screen.height * 0.2,Screen.width * 0.4,Screen.height * 0.2),"Nazwa : " + ItemManager.NazwaPL[Slots[WybranySlot]] + "\n" + "Typ : " + ItemManager.TypeNamePL[Slots[WybranySlot]] + "\n" + "Wymagana siła : " + ItemManager.ReqStr[Slots[WybranySlot]] + "\n" + "Wymagana zręczność : " + ItemManager.ReqAgi[Slots[WybranySlot]] + "\n" + "Obrażenia : " + ItemManager.Damage[Slots[WybranySlot]] + "\n" + "Cena(sprzedarzy) : " + Mathf.Round((ItemManager.Cost[Slots[WybranySlot]] * 0.125)),Styl);
							}
						}
						else
						{
							if(ItemManager.ReqStr[Slots[WybranySlot]] > PlayerMainScript.Str)
							{
								if(!Sklep)
								{
									GUI.Label(Rect(Screen.width * 0.55,Screen.height * 0.2,Screen.width * 0.4,Screen.height * 0.2),"Nazwa : " + ItemManager.NazwaPL[Slots[WybranySlot]] + "\n" + "Typ : " + ItemManager.TypeNamePL[Slots[WybranySlot]] + "\n" + "Wymagana siła : " + ItemManager.ReqStr[Slots[WybranySlot]] + "\n" + "Wymagana zręczność : " + ItemManager.ReqAgi[Slots[WybranySlot]] + "\n" + "Obrażenia : " + ItemManager.Damage[Slots[WybranySlot]] + "\n" + "Cena(kupna) : " + ItemManager.Cost[Slots[WybranySlot]],StylEquiqable);
								}
								if(Sklep)
								{
									GUI.Label(Rect(Screen.width * 0.55,Screen.height * 0.2,Screen.width * 0.4,Screen.height * 0.2),"Nazwa : " + ItemManager.NazwaPL[Slots[WybranySlot]] + "\n" + "Typ : " + ItemManager.TypeNamePL[Slots[WybranySlot]] + "\n" + "Wymagana siła : " + ItemManager.ReqStr[Slots[WybranySlot]] + "\n" + "Wymagana zręczność : " + ItemManager.ReqAgi[Slots[WybranySlot]] + "\n" + "Obrażenia : " + ItemManager.Damage[Slots[WybranySlot]] + "\n" + "Cena(sprzedarzy) : " + Mathf.Round((ItemManager.Cost[Slots[WybranySlot]] * 0.125)),StylEquiqable);
								}
							}
							if(ItemManager.ReqAgi[Slots[WybranySlot]] > PlayerMainScript.Agi)
							{
								if(!Sklep)
								{
									GUI.Label(Rect(Screen.width * 0.55,Screen.height * 0.2,Screen.width * 0.4,Screen.height * 0.2),"Nazwa : " + ItemManager.NazwaPL[Slots[WybranySlot]] + "\n" + "Typ : " + ItemManager.TypeNamePL[Slots[WybranySlot]] + "\n" + "Wymagana siła : " + ItemManager.ReqStr[Slots[WybranySlot]] + "\n" + "Wymagana zręczność : " + ItemManager.ReqAgi[Slots[WybranySlot]] + "\n" + "Obrażenia : " + ItemManager.Damage[Slots[WybranySlot]] + "\n" + "Cena(kupna) : " + ItemManager.Cost[Slots[WybranySlot]],StylEquiqable);
								}
								if(Sklep)
								{
									GUI.Label(Rect(Screen.width * 0.55,Screen.height * 0.2,Screen.width * 0.4,Screen.height * 0.2),"Nazwa : " + ItemManager.NazwaPL[Slots[WybranySlot]] + "\n" + "Typ : " + ItemManager.TypeNamePL[Slots[WybranySlot]] + "\n" + "Wymagana siła : " + ItemManager.ReqStr[Slots[WybranySlot]] + "\n" + "Wymagana zręczność : " + ItemManager.ReqAgi[Slots[WybranySlot]] + "\n" + "Obrażenia : " + ItemManager.Damage[Slots[WybranySlot]] + "\n" + "Cena(sprzedarzy) : " + Mathf.Round((ItemManager.Cost[Slots[WybranySlot]] * 0.125)),StylEquiqable);
								}
							}
						}
					}
					if(ItemManager.Type[Slots[WybranySlot]] > 0 && ItemManager.Type[Slots[WybranySlot]] <= 5)
					{
						if(ItemManager.ReqStr[Slots[WybranySlot]] <= PlayerMainScript.Str)
						{
							if(!Sklep)
							{
								GUI.Label(Rect(Screen.width * 0.55,Screen.height * 0.2,Screen.width * 0.4,Screen.height * 0.2),"Nazwa : " + ItemManager.NazwaPL[Slots[WybranySlot]] + "\n" + "Typ : " + ItemManager.TypeNamePL[Slots[WybranySlot]] + "\n" + "Wymagana siła : " + ItemManager.ReqStr[Slots[WybranySlot]] + "\n" + "Obrona : " + ItemManager.Defense[Slots[WybranySlot]] + "\n" + "Cena(kupna) : " + ItemManager.Cost[Slots[WybranySlot]],Styl);
							}
							if(Sklep)
							{
								GUI.Label(Rect(Screen.width * 0.55,Screen.height * 0.2,Screen.width * 0.4,Screen.height * 0.2),"Nazwa : " + ItemManager.NazwaPL[Slots[WybranySlot]] + "\n" + "Typ : " + ItemManager.TypeNamePL[Slots[WybranySlot]] + "\n" + "Wymagana siła : " + ItemManager.ReqStr[Slots[WybranySlot]] + "\n" + "Obrona : " + ItemManager.Defense[Slots[WybranySlot]] + "\n" + "Cena(sprzedarzy) : " + Mathf.Round((ItemManager.Cost[Slots[WybranySlot]] * 0.125)),Styl);
							}
						}
						else
						{
							if(!Sklep)
							{
								GUI.Label(Rect(Screen.width * 0.55,Screen.height * 0.2,Screen.width * 0.4,Screen.height * 0.2),"Nazwa : " + ItemManager.NazwaPL[Slots[WybranySlot]] + "\n" + "Typ : " + ItemManager.TypeNamePL[Slots[WybranySlot]] + "\n" + "Wymagana siła : " + ItemManager.ReqStr[Slots[WybranySlot]] + "\n" + "Wymagana zręczność : " + ItemManager.ReqAgi[Slots[WybranySlot]] + "\n" + "Obrażenia : " + ItemManager.Damage[Slots[WybranySlot]] + "\n" + "Cena(kupna) : " + ItemManager.Cost[Slots[WybranySlot]],StylEquiqable);
							}
							if(Sklep)
							{
								GUI.Label(Rect(Screen.width * 0.55,Screen.height * 0.2,Screen.width * 0.4,Screen.height * 0.2),"Nazwa : " + ItemManager.NazwaPL[Slots[WybranySlot]] + "\n" + "Typ : " + ItemManager.TypeNamePL[Slots[WybranySlot]] + "\n" + "Wymagana siła : " + ItemManager.ReqStr[Slots[WybranySlot]] + "\n" + "Wymagana zręczność : " + ItemManager.ReqAgi[Slots[WybranySlot]] + "\n" + "Obrażenia : " + ItemManager.Damage[Slots[WybranySlot]] + "\n" + "Cena(sprzedarzy) : " + Mathf.Round((ItemManager.Cost[Slots[WybranySlot]] * 0.125)),StylEquiqable);
							}
						}
					}
					if(ItemManager.Type[Slots[WybranySlot]] == 6 || ItemManager.Type[Slots[WybranySlot]] == 7)
					{
						if(!Sklep)
						{
							GUI.Label(Rect(Screen.width * 0.55,Screen.height * 0.2,Screen.width * 0.4,Screen.height * 0.2),"Nazwa : " + ItemManager.NazwaPL[Slots[WybranySlot]] + "\n" + "Typ : " + ItemManager.TypeNamePL[Slots[WybranySlot]] + "\n" + "Plus do siły : " + ItemManager.StrPlus[Slots[WybranySlot]] + "\n" + "Plus do zręczności : " + ItemManager.AgiPlus[Slots[WybranySlot]] + "\n" + "Plus do żywotności : " + ItemManager.EngPlus[Slots[WybranySlot]] + "\n" + "Cena(kupna) : " + ItemManager.Cost[Slots[WybranySlot]],Styl);
							GUI.depth = 0;
						}
						if(Sklep)
						{
							GUI.Label(Rect(Screen.width * 0.55,Screen.height * 0.2,Screen.width * 0.4,Screen.height * 0.2),"Nazwa : " + ItemManager.NazwaPL[Slots[WybranySlot]] + "\n" + "Typ : " + ItemManager.TypeNamePL[Slots[WybranySlot]] + "\n" + "Plus do siły : " + ItemManager.StrPlus[Slots[WybranySlot]] + "\n" + "Plus do zręczności : " + ItemManager.AgiPlus[Slots[WybranySlot]] + "\n" + "Plus do żywotności : " + ItemManager.EngPlus[Slots[WybranySlot]] + "\n" + "Cena(sprzedarzy) : " + Mathf.Round((ItemManager.Cost[Slots[WybranySlot]] * 0.125)),Styl);
							GUI.depth = 0;
						}
					}
					if(!Sklep)
					{
						if(GUI.Button(Rect(Screen.width * 0.9,Screen.height * 0.2,Screen.width * 0.075,Screen.width * 0.075),"",ThrowTexture))
						{
							WyrzucanyItem = WybranySlot;
							WyrzucItem();
							WybranySlot = -1;
							WybranySlotChest = -1;
							return;
						}
					}
					if(Sklep)
					{
						if(GUI.Button(Rect(Screen.width * 0.9,Screen.height * 0.2,Screen.width * 0.075,Screen.width * 0.075),"",SellTexture))
						{
							Gold += Mathf.Round(ItemManager.Cost[Slots[WybranySlot]] * 0.125);
							Quests.IloscZadania[8] += Mathf.Round(ItemManager.Cost[Slots[WybranySlot]] * 0.125);
							Slots[WybranySlot] = 0;
							WybranySlot = -1;
							WybranySlotChest = -1;
							WybranySlotSklep = -1;
							return;
						}
					}
					if(ItemManager.Equiqable[Slots[WybranySlot]] == 1)
					{
						if(ItemManager.ReqStr[Slots[WybranySlot]] <= PlayerMainScript.Str && ItemManager.ReqAgi[Slots[WybranySlot]] <= PlayerMainScript.Agi)
						{
							if(GUI.Button(Rect(Screen.width * 0.9,Screen.height * 0.35,Screen.width * 0.075,Screen.width * 0.075),"",EquipTexture))
							{
								if(Slots[WybranySlot] != 0)
								{
									var Typ = ItemManager.Type[Slots[WybranySlot]];
									var Wymieniany = 0;
									Wymieniany = Equiped[Typ];
									if(ItemManager.Type[Slots[WybranySlot]] == 6 || ItemManager.Type[Slots[WybranySlot]] == 7)
									{
										PlayerMainScript.MaxHp = (PlayerMainScript.Eng * 10) + 45 + (PlayerMainScript.Lv * 5);
										PlayerMainScript.Hp += ItemManager.EngPlus[Slots[WybranySlot]] * 10;
									}
									Equiped[Typ] = Slots[WybranySlot];
									Slots[WybranySlot] = Wymieniany;
									if(ItemManager.Type[Slots[WybranySlot]] == 0)
									{
										if(Equiped[0] == 14 || Equiped[0] == 17 || Equiped[0] == 21 || Equiped[0] == 25 || Equiped[0] == 29)
										{
											LiniaStrzaluRenderer.material = LiniaWidac;
											Destroy(AktualnaBron);
											AktualnaBron = null;
											AktualnaBron = Instantiate(ItemManager.ModeleBron[Equiped[0]],PunktAtakuLuk.position,PunktAtakuLuk.rotation);
											AktualnaBron.transform.parent = PunktAtakuLuk;
										}
										else
										{
											LiniaStrzaluRenderer.material = LiniaNieWidac;
											Destroy(AktualnaBron);
											AktualnaBron = null;
											AktualnaBron = Instantiate(ItemManager.ModeleBron[Equiped[0]],PunktAtakuMiecz.position,PunktAtakuMiecz.rotation);
											AktualnaBron.transform.parent = PunktAtakuMiecz;
										}
									}
									Wymieniany = 0;
									Typ = 0;
									WybranySlot = -1;
									WybranySlotChest = -1;
									WybranySlotSklep = -1;
									return;
								}
							}
						}
					}
				}
				if(WybranyEquiped)
				{
					if(ItemManager.Type[Equiped[WybranySlot]] == 0)
					{
						GUI.depth = -2;
						GUI.Button(Rect((slotPos[WybranySlot].x * Screen.width) + (Screen.width * 0.05)  - (0.0225 * Screen.width),Screen.height * 0.1,Screen.width * 0.045,Screen.width * 0.045),"",Zaznaczony);
						GUI.depth = 1;
						GUI.Label(Rect(Screen.width * 0.55,Screen.height * 0.2,Screen.width * 0.4,Screen.height * 0.2),"Nazwa : " + ItemManager.NazwaPL[Equiped[WybranySlot]] + "\n" + "Typ : " + ItemManager.TypeNamePL[Equiped[WybranySlot]] + "\n" + "Wymagana siła : " + ItemManager.ReqStr[Equiped[WybranySlot]] + "\n" + "Wymagana zręczność : " + ItemManager.ReqAgi[Equiped[WybranySlot]] + "\n" + "Obrażenia : " + ItemManager.Damage[Equiped[WybranySlot]] + "\n" + "Cena(kupna) : " + ItemManager.Cost[Equiped[WybranySlot]],Styl);
						GUI.depth = 0;
					}
					if(ItemManager.Type[Equiped[WybranySlot]] > 0 && ItemManager.Type[Equiped[WybranySlot]] <= 5)
					{
						GUI.depth = -2;
						GUI.Button(Rect((slotPos[WybranySlot].x * Screen.width) + (Screen.width * 0.05)  - (0.0225 * Screen.width),Screen.height * 0.1,Screen.width * 0.045,Screen.width * 0.045),"",Zaznaczony);
						GUI.depth = 1;
						GUI.Label(Rect(Screen.width * 0.55,Screen.height * 0.2,Screen.width * 0.4,Screen.height * 0.2),"Nazwa : " + ItemManager.NazwaPL[Equiped[WybranySlot]] + "\n" + "Typ : " + ItemManager.TypeNamePL[Equiped[WybranySlot]] + "\n" + "Wymagana siła : " + ItemManager.ReqStr[Equiped[WybranySlot]] + "\n" + "Obrona : " + ItemManager.Defense[Equiped[WybranySlot]] + "\n" + "Cena(kupna) : " + ItemManager.Cost[Equiped[WybranySlot]],Styl);
						GUI.depth = 0;
					}
					if(ItemManager.Type[Equiped[WybranySlot]] == 6 || ItemManager.Type[Equiped[WybranySlot]] == 7)
					{
						GUI.depth = -2;
						GUI.Button(Rect((slotPos[WybranySlot].x * Screen.width) + (Screen.width * 0.05)  - (0.0225 * Screen.width),Screen.height * 0.1,Screen.width * 0.045,Screen.width * 0.045),"",Zaznaczony);
						GUI.depth = 1;
						GUI.Label(Rect(Screen.width * 0.55,Screen.height * 0.2,Screen.width * 0.4,Screen.height * 0.2),"Nazwa : " + ItemManager.NazwaPL[Equiped[WybranySlot]] + "\n" + "Typ : " + ItemManager.TypeNamePL[Equiped[WybranySlot]] + "\n" + "Plus do siły : " + ItemManager.StrPlus[Equiped[WybranySlot]] + "\n" + "Plus do zręczności : " + ItemManager.AgiPlus[Equiped[WybranySlot]] + "\n" + "Plus do żywotności : " + ItemManager.EngPlus[Equiped[WybranySlot]] + "\n" + "Cena(kupna) : " + ItemManager.Cost[Equiped[WybranySlot]],Styl);
						for(var t = 0; t < Slots.length; t++)
						{
							if(Slots[t] == 0)
							{
								if(GUI.Button(Rect(Screen.width * 0.9,Screen.height * 0.35,Screen.width * 0.075,Screen.width * 0.075),"",UnEquipTexture))
								{
									Slots[t] = Equiped[WybranySlot];
									Equiped[WybranySlot] = 0;
									WybranySlot = -1;
									WybranyEquiped = false;
								}
							}
						}
					}
				}
			}
		}
		if(Full)
		{
			GUI.Label(Rect(Screen.width * 0.4,Screen.height * 0.4,Screen.width * 0.2,Screen.height * 0.2),"Pełny ekwipunek",SrodekNapis);
		}
		if(!Skrzynia)
		{
			WybranySlotChest = 0;
		}	
		if(WlaczanieSklepu)
		{
			if(!Sklep && !Skrzynia && !Escape.Menu && !PlayerMainScript.Stats && !MapScript.Map && !PlayerMainScript.Teleport && !LoadingText.Loading && !LoadingText.Dead && !Eq && !Quests.Quests && !Spells.SpellBook && !PlayerAttackScript.ActivatedSpell && !Rewards.RewardMenu)
			{
				GUI.depth = 1;
				if(GUI.Button(Rect(Screen.width * 0.9,(Screen.height * 0.225) + (Screen.width * 0.075),Screen.width * 0.075,Screen.width * 0.075),"",StylSklepButton))
				{
					SklepS = SklepGM.GetComponent("Sklep");
					WybranySlotSklep = -1;
					Eq = true;
					Sklep = true;
					WybranySlot = -1;
					WybranyEquiped = false;
					for(var q = 0; q < Slots.length; q++)
					{
						SlotPos[q].x = slotPos[q].x * Screen.width;
						SlotPos[q].y = -(slotPos[q].y * Screen.height) + Screen.height;
					}
				}
				GUI.depth = 0;
			}
		}		
		if(OtwieranieSkrzyni)
		{
			if(!Sklep && !Skrzynia && !Escape.Menu && !PlayerMainScript.Stats && !MapScript.Map && !PlayerMainScript.Teleport && !LoadingText.Loading && !LoadingText.Dead && !Eq && !Quests.Quests && !Spells.SpellBook && !PlayerAttackScript.ActivatedSpell && !Rewards.RewardMenu)
			{
				GUI.depth = 1;
				if(GUI.Button(Rect(Screen.width * 0.9,(Screen.height * 0.225) + (Screen.width * 0.075),Screen.width * 0.075,Screen.width * 0.075),"",StylChestButton))
				{
					ChestAudioSource.clip = ChestOpen;
					ChestAudioSource.Play();
					ChestS = SkrzynkaGM.GetComponent("Skrzynia");
					WybranySlotChest = -1;
					Eq = true;
					Skrzynia = true;
					WybranySlot = -1;
					WybranyEquiped = false;
					CosJestSkrzynia = false;
					for(var ab = 0; ab < Slots.length; ab++)
					{
						SlotPos[ab].x = slotPos[ab].x * Screen.width;
						SlotPos[ab].y = -(slotPos[ab].y * Screen.height) + Screen.height;
					}
					for(var bc = 0; bc < ChestS.Slots.length; bc++)
					{
						if(ChestS.Slots[bc] > 0)
						{
							CosJestSkrzynia = true;
						}
					}
				}
				GUI.depth = 0;
			}
		}	
		if(NieZdatnaDoUzytku)
		{
			GUI.Label(Rect(Screen.width * 0.3,Screen.height * 0.4,Screen.width * 0.4,Screen.height * 0.2),"Postać nie zdatna do użytku",StylNapis1);
		}
		for(var s = 0; s < 6; s++)
		{
			if(PlayerMainScript.Str < ItemManager.ReqStr[Equiped[s]])
			{
				NieZdatnaDoUzytku = true;
				return;
			}
			if(PlayerMainScript.Agi < ItemManager.ReqAgi[Equiped[s]])
			{
				NieZdatnaDoUzytku = true;
				return;
			}
			else
			{
				NieZdatnaDoUzytku = false;
				return;
			}
		}
	}
	if(Settings.Language == 2)
	{
		if(Eq)
		{
			GUI.depth = -1;
			GUI.Box(Rect(Screen.width * 0.5,0,Screen.width * 0.5,Screen.height),"",EqStyle);
			GUI.depth = 0;
			if(GUI.Button(Rect(Screen.width * 0.95,0,Screen.width * 0.05,Screen.width * 0.05),"",ExitTexture))
			{
				if(Skrzynia)
				{
					ChestAudioSource.clip = ChestClose;
					ChestAudioSource.Play();
				}
				Skrzynia = false;
				CosJestSkrzynia = false;
				Sklep = false;
				Eq = false;
			}
			GUI.Label(Rect(Screen.width * 0.5,0,Screen.width * 0.5,Screen.height * 0.075),"Gold : " + Gold,Styl);
			for(var ien = 0; ien < Slots.length; ien++)
			{
				if(Slots[ien] != 0)
				{
					if(GUI.Button(Rect(SlotPos[ien].x,SlotPos[ien].y,SlotSize,SlotSize),"",ItemManager.Textures[Slots[ien]]))
					{
						if(WybranySlot == -1 || WybranySlot != i)
						{
							WybranyEquiped = false;
							WybranySlotChest = -1;
							WybranySlotSklep = -1;
							WybranySlot = ien;
							return;
						}
						if(WybranySlot == ien)
						{
							WybranySlot = -1;
							return;
						}
						
					}
					if(WybranySlot == ien)
					{
						if(GUI.Button(Rect(SlotPos[ien].x,SlotPos[ien].y,SlotSize,SlotSize),"",ItemManager.Textures[Slots[ien]]))
						{
							WybranySlot = -1;
						}
					}
				}
				if(Slots[ien] == 0)
				{
					if(WybranySlot == -1)
					{
						GUI.Label(Rect(SlotPos[ien].x,SlotPos[ien].y,SlotSize,SlotSize),"",EmptySlot);
					}
					if(WybranySlot > -1)
					{
						if(GUI.Button(Rect(SlotPos[ien].x,SlotPos[ien].y,SlotSize,SlotSize),"",EmptySlot))
						{
							Slots[ien] = Slots[WybranySlot];
							Slots[WybranySlot] = 0;
							WybranySlot = -1;
						}
					}
				}
			}
			if(Potions > 0)
			{
				if(!Sklep)
				{
					if(GUI.Button(Rect(Screen.width * 0.525,Screen.height * 0.4,Screen.width * 0.045,Screen.width * 0.045),"",PotionTexture))
					{
						if(PlayerMainScript.Hp < PlayerMainScript.MaxHp)
						{
							if(PlayerMainScript.Dodano < 4)
							{
								this.gameObject.SendMessage("DodawaniePotion",SendMessageOptions.DontRequireReceiver);
							}
						}
					}
				}
				if(Sklep)
				{
					if(GUI.Button(Rect(Screen.width * 0.525,Screen.height * 0.4,Screen.width * 0.045,Screen.width * 0.045),"",PotionTexture))
					{
						Gold += ItemManager.Cost[2] * 0.125;
						Potions--;
						WybranySlot = -1;
						WybranySlotChest = -1;
						WybranySlotSklep = -1;
						return;
					}
				}
				GUI.Label(Rect(Screen.width * 0.525,Screen.height * 0.4,Screen.width * 0.045,Screen.width * 0.045),"",Zaznaczony);
				GUI.Label(Rect(Screen.width * 0.525,Screen.height * 0.335,Screen.width * 0.045,Screen.width * 0.045),"x" + Potions,Styl);
			}
			if(Potions == 0)
			{
				GUI.Label(Rect(Screen.width * 0.525,Screen.height * 0.4,Screen.width * 0.045,Screen.width * 0.045),"",EmptySlot);
			}
			if(Potions < 0)
			{
				Potions = 0;
			}
			for(var pen = 0; pen < Equiped.length; pen++)
			{
				if(Equiped[pen] == 0)
				{
					GUI.Label(Rect((slotPos[pen].x * Screen.width) + (Screen.width * 0.05) - (0.0225 * Screen.width),Screen.height * 0.1,SlotSize,SlotSize),"",EmptySlot);
				}
				if(Equiped[p] != 0)
				{
					if(GUI.Button(Rect((slotPos[pen].x * Screen.width) + (Screen.width * 0.05) - (0.0225 * Screen.width),Screen.height * 0.1,SlotSize,SlotSize),"",ItemManager.Textures[Equiped[pen]]))
					{
						if(!WybranyEquiped || WybranyEquiped && WybranySlot != pen)
						{
							WybranySlotSklep = -1;
							WybranySlotChest = -1;
							WybranySlot = pen;
							WybranyEquiped = true;
							return;
						}
						if(WybranyEquiped && WybranySlot == pen)
						{
							WybranySlotSklep = -1;
							WybranySlotChest = -1;
							WybranySlot = -1;
							WybranyEquiped = false;
							return;
						}
					}
				}
			}
		if(Skrzynia)
		{
			GUI.depth = -1;
			GUI.Box(Rect(Screen.width * 0.1,Screen.height * 0.1,Screen.width * 0.35,Screen.height * 0.8),"",EqStyle);
			GUI.depth = 0;
			for(var xen = 0; xen < 12; xen++)
			{
				if(ChestS.Slots[xen] != 0)
				{
					if(x < 6)
					{
						Pos1 = (xen - (0.45 * xen)) / 10;
						if(GUI.Button(Rect(Screen.width * (0.11 + Pos1),Screen.height * 0.15,SlotSize,SlotSize),"",ItemManager.Textures[ChestS.Slots[xen]]))
						{
							WybranySlot = -1;
							WybranyEquiped = false;
							WybranySlotChest = x;
						}
					}
					if(xen >= 6 && xen <= 11)
					{
						Pos2 = (((xen - 6) - (0.45 * (xen - 6)))) / 10;
						if(GUI.Button(Rect(Screen.width * (0.11 + Pos2),Screen.height * 0.25,SlotSize,SlotSize),"",ItemManager.Textures[ChestS.Slots[xen]]))
						{
							WybranySlot = -1;
							WybranyEquiped = false;
							WybranySlotChest = xen;
						}
					}
				}
				if(ChestS.Slots[xen] == 0)
				{
					if(xen < 6)
					{
						Pos1 = (xen - (0.45 * xen)) / 10;
						GUI.Label(Rect(Screen.width * (0.11 + Pos1),Screen.height * 0.15,SlotSize,SlotSize),"",EmptySlot);
					}
					if(xen >= 6 && xen <= 11)
					{
						Pos2 = (((xen - 6) - (0.45 * (xen - 6)))) / 10;
						GUI.Label(Rect(Screen.width * (0.11 + Pos2),Screen.height * 0.25,SlotSize,SlotSize),"",EmptySlot);
					}
				}
			}
			if(CosJestSkrzynia)
			{
				if(GUI.Button(Rect(Screen.width * 0.375,Screen.height * 0.7,SlotSize,SlotSize),"",TakeAllIcon))
				{
					for(var ben = 0; ben < ChestS.Slots.length; ben++)
					{
						if(ChestS.Slots[ben] > 0)
						{
							if(ChestS.Slots[ben] == 1)
							{
								Gold += ChestS.Zloto[ben];
								ChestS.Zloto[ben] = 0;
								ChestS.Slots[ben] = 0;
							}
							if(ChestS.Slots[ben] == 2)
							{
								Potions++;
								Quests.IloscZadania[6]++;
								ChestS.Slots[ben] = 0;
							}
							if(ChestS.Slots[ben] >= 3)
							{
								for(var cen = 0; cen < Slots.length; cen++)
								{
									if(Slots[cen] == 0)
									{
										Slots[cen] = ChestS.Slots[ben];
										if(ChestS.Slots[ben] != 0)
										{
											Quests.IloscZadania[6]++;
										}
										ChestS.Slots[ben] = 0;
									}
								}
							}
							CosJestSkrzynia = false;
						}
					}
				}
			}
			if(WybranySlotChest > -1)
			{
				if(WybranySlotChest < 6)
				{
					var Pos7 = (WybranySlotChest - (0.45 * WybranySlotChest)) / 10;
					GUI.Button(Rect(Screen.width * (0.11 + Pos7),Screen.height * 0.15,SlotSize,SlotSize),"",Zaznaczony);
				}
				if(WybranySlotChest >= 6 && WybranySlotChest <= 11)
				{
					var Pos8 = (((WybranySlotChest - 6) - (0.45 * (WybranySlotChest - 6)))) / 10;
					GUI.Button(Rect(Screen.width * (0.11 + Pos8),Screen.height * 0.25,SlotSize,SlotSize),"",Zaznaczony);
				}
				if(ChestS.Slots[WybranySlotChest] == 1)
				{
					GUI.Label(Rect(Screen.width * 0.1,Screen.height * 0.35,Screen.width * 0.35,Screen.height * 0.3),"Name : " + ItemManager.NazwaENG[ChestS.Slots[WybranySlotChest]] + "\n" + "Type : " + ItemManager.TypeNameENG[ChestS.Slots[WybranySlotChest]] + "\n" + "Quantity : "
					+ ChestS.Zloto[WybranySlotChest],Styl);
				}
				if(ChestS.Slots[WybranySlotChest] > 1 && ChestS.Slots[WybranySlotChest] <= 10)
				{
					GUI.Label(Rect(Screen.width * 0.1,Screen.height * 0.35,Screen.width * 0.35,Screen.height * 0.3),"Name : " + ItemManager.NazwaENG[ChestS.Slots[WybranySlotChest]] + "\n" + "Type : " + ItemManager.TypeNameENG[ChestS.Slots[WybranySlotChest]] + "\n" + "Cosy(Buy) : " + ItemManager.Cost[ChestS.Slots[WybranySlotChest]],Styl);
				}
				if(ChestS.Slots[WybranySlotChest] > 10 && ChestS.Slots[WybranySlotChest] <= 30)
				{
					GUI.Label(Rect(Screen.width * 0.1,Screen.height * 0.35,Screen.width * 0.35,Screen.height * 0.3),"Name : " + ItemManager.NazwaENG[ChestS.Slots[WybranySlotChest]] + "\n" + "Type : " + ItemManager.TypeNameENG[ChestS.Slots[WybranySlotChest]] + "\n" + "Required strength : " + ItemManager.ReqStr[ChestS.Slots[WybranySlotChest]] + "\n" + "Required dexterity : " + ItemManager.ReqAgi[ChestS.Slots[WybranySlotChest]] + "\n" + "Damage : " + ItemManager.Damage[ChestS.Slots[WybranySlotChest]] + "\n" + "Cost(Buy) : " + ItemManager.Cost[ChestS.Slots[WybranySlotChest]],Styl);
				}
				if(ChestS.Slots[WybranySlotChest] > 30 && ChestS.Slots[WybranySlotChest] <= 80)
				{
					GUI.Label(Rect(Screen.width * 0.1,Screen.height * 0.35,Screen.width * 0.35,Screen.height * 0.3),"Name : " + ItemManager.NazwaENG[ChestS.Slots[WybranySlotChest]] + "\n" + "Type : " + ItemManager.TypeNameENG[ChestS.Slots[WybranySlotChest]] + "\n" + "Required strength : " + ItemManager.ReqStr[ChestS.Slots[WybranySlotChest]] + "\n" + "Defense : " + ItemManager.Defense[ChestS.Slots[WybranySlotChest]] + "\n" + "Cost(Buy) : " + ItemManager.Cost[ChestS.Slots[WybranySlotChest]],Styl);
				}
				if(ChestS.Slots[WybranySlotChest] > 80 && ChestS.Slots[WybranySlotChest] <= 100)
				{
					GUI.Label(Rect(Screen.width * 0.1,Screen.height * 0.35,Screen.width * 0.35,Screen.height * 0.3),"Name : " + ItemManager.NazwaENG[ChestS.Slots[WybranySlotChest]] + "\n" + "Type : " + ItemManager.TypeNameENG[ChestS.Slots[WybranySlotChest]] + "\n" + "Plus do siły : " + ItemManager.StrPlus[ChestS.Slots[WybranySlotChest]] + "\n" + "Plus dexterity : " + ItemManager.AgiPlus[ChestS.Slots[WybranySlotChest]] + "\n" + "Plus vitality : " + ItemManager.EngPlus[ChestS.Slots[WybranySlotChest]] + "\n" + "Cost(Buy) : " + ItemManager.Cost[ChestS.Slots[WybranySlotChest]],Styl);
				}
				if(ChestS.Slots[WybranySlotChest] > 1)
				{
					if(ChestS.Slots[WybranySlotChest] == 2)
					{
						if(GUI.Button(Rect(Screen.width * 0.235,Screen.height * 0.7,Screen.width * 0.075,Screen.width * 0.075),"",TakeTexture))
						{
							Potions++;
							Quests.IloscZadania[6]++;
							ChestS.Slots[WybranySlotChest] = 0;
						}
					}
					if(ChestS.Slots[WybranySlotChest] > 2)
					{
						if(GUI.Button(Rect(Screen.width * 0.235,Screen.height * 0.7,Screen.width * 0.075,Screen.width * 0.075),"",TakeTexture))
						{
							for(var uen = 0; uen < Slots.length; uen++)
							{
								if(Slots[uen] == 0)
								{
									Slots[uen] = ChestS.Slots[WybranySlotChest];
									if(ChestS.Slots[WybranySlotChest] != 0)
									{
										Quests.IloscZadania[6]++;
									}
									ChestS.Slots[WybranySlotChest] = 0;
								}
							}
						}
					}
				}
				if(ChestS.Slots[WybranySlotChest] == 1)
				{
					if(GUI.Button(Rect(Screen.width * 0.235,Screen.height * 0.7,Screen.width * 0.075,Screen.width * 0.075),"",TakeTexture))
					{
						Gold += ChestS.Zloto[WybranySlotChest];
						ChestS.Slots[WybranySlotChest] = 0;
					}
				}
			}
		}
		if(Sklep)
		{
			GUI.depth = -1;
			GUI.Box(Rect(Screen.width * 0.1,Screen.height * 0.1,Screen.width * 0.35,Screen.height * 0.8),"",EqStyle);
			GUI.depth = 0;
			for(var cden = 0; cden < 12; cden++)
			{
				if(SklepS.Slots[cden] != 0)
				{
					if(cden < 6)
					{
						Pos1 = (cden - (0.45 * cden)) / 10;
						if(GUI.Button(Rect(Screen.width * (0.11 + Pos1),Screen.height * 0.15,SlotSize,SlotSize),"",ItemManager.Textures[SklepS.Slots[cden]]))
						{
							WybranyEquiped = false;
							WybranySlot = -1;
							WybranySlotChest = -1;
							WybranySlotSklep = cd;
						}
					}
					if(cden >= 6 && cden <= 11)
					{
						Pos2 = (((cden - 6) - (0.45 * (cden - 6)))) / 10;
						if(GUI.Button(Rect(Screen.width * (0.11 + Pos2),Screen.height * 0.25,SlotSize,SlotSize),"",ItemManager.Textures[SklepS.Slots[cden]]))
						{
							WybranyEquiped = false;
							WybranySlotChest = -1;
							WybranySlot = -1;
							WybranySlotSklep = cden;
						}
					}
				}
				if(SklepS.Slots[cden] == 0)
				{
					if(cden < 6)
					{
						Pos1 = (cden - (0.45 * cden)) / 10;
						GUI.Label(Rect(Screen.width * (0.11 + Pos1),Screen.height * 0.15,SlotSize,SlotSize),"",EmptySlot);
					}
					if(cden >= 6 && cden <= 11)
					{
						Pos2 = (((cden - 6) - (0.45 * (cden - 6)))) / 10;
						GUI.Label(Rect(Screen.width * (0.11 + Pos2),Screen.height * 0.25,SlotSize,SlotSize),"",EmptySlot);
					}
				}
			}
			if(WybranySlotSklep > -1)
			{
				if(WybranySlotSklep < 6)
				{
					var Pos9 = (WybranySlotSklep - (0.45 * WybranySlotSklep)) / 10;
					GUI.Button(Rect(Screen.width * (0.11 + Pos9),Screen.height * 0.15,SlotSize,SlotSize),"",Zaznaczony);
				}
				if(WybranySlotSklep >= 6 && WybranySlotSklep <= 11)
				{
					var Pos10 = (((WybranySlotSklep - 6) - (0.45 * (WybranySlotSklep - 6)))) / 10;
					GUI.Button(Rect(Screen.width * (0.11 + Pos10),Screen.height * 0.25,SlotSize,SlotSize),"",Zaznaczony);
				}
				if(SklepS.Slots[WybranySlotSklep] > 1 && SklepS.Slots[WybranySlotSklep] <= 10)
				{
					GUI.Label(Rect(Screen.width * 0.1,Screen.height * 0.35,Screen.width * 0.35,Screen.height * 0.3),"Name : " + ItemManager.NazwaENG[SklepS.Slots[WybranySlotSklep]] + "\n" + "Type : " + ItemManager.TypeNameENG[SklepS.Slots[WybranySlotSklep]] + "\n" + "Cost(Buy) : " + ItemManager.Cost[SklepS.Slots[WybranySlotSklep]],Styl);
				}
				if(SklepS.Slots[WybranySlotSklep] > 10 && SklepS.Slots[WybranySlotSklep] <= 30)
				{
					if(ItemManager.ReqStr[SklepS.Slots[WybranySlotSklep]] <= PlayerMainScript.Str && ItemManager.ReqAgi[SklepS.Slots[WybranySlotSklep]] <= PlayerMainScript.Agi)
					{
						GUI.Label(Rect(Screen.width * 0.1,Screen.height * 0.35,Screen.width * 0.35,Screen.height * 0.3),"Name : " + ItemManager.NazwaENG[SklepS.Slots[WybranySlotSklep]] + "\n" + "Type : " + ItemManager.TypeNameENG[SklepS.Slots[WybranySlotSklep]] + "\n" + "Required strength : " + ItemManager.ReqStr[SklepS.Slots[WybranySlotSklep]] + "\n" + "Required dexterity : " + ItemManager.ReqAgi[SklepS.Slots[WybranySlotSklep]] + "\n" + "Damage : " + ItemManager.Damage[SklepS.Slots[WybranySlotSklep]] + "\n" + "Cost(Buy) : " + ItemManager.Cost[SklepS.Slots[WybranySlotSklep]],Styl);
					}
					if(ItemManager.ReqStr[SklepS.Slots[WybranySlotSklep]] > PlayerMainScript.Str || ItemManager.ReqAgi[SklepS.Slots[WybranySlotSklep]] > PlayerMainScript.Agi)
					{
						GUI.Label(Rect(Screen.width * 0.1,Screen.height * 0.35,Screen.width * 0.35,Screen.height * 0.3),"Name : " + ItemManager.NazwaENG[SklepS.Slots[WybranySlotSklep]] + "\n" + "Type : " + ItemManager.TypeNameENG[SklepS.Slots[WybranySlotSklep]] + "\n" + "Required strength : " + ItemManager.ReqStr[SklepS.Slots[WybranySlotSklep]] + "\n" + "Required dexterity : " + ItemManager.ReqAgi[SklepS.Slots[WybranySlotSklep]] + "\n" + "Damage : " + ItemManager.Damage[SklepS.Slots[WybranySlotSklep]] + "\n" + "Cost(Buy) : " + ItemManager.Cost[SklepS.Slots[WybranySlotSklep]],StylEquiqable);
					}
				}
				if(SklepS.Slots[WybranySlotSklep] > 30 && SklepS.Slots[WybranySlotSklep] <= 80)
				{
					if(ItemManager.ReqStr[SklepS.Slots[WybranySlotSklep]] <= PlayerMainScript.Str)
					{
						GUI.Label(Rect(Screen.width * 0.1,Screen.height * 0.35,Screen.width * 0.35,Screen.height * 0.3),"Name : " + ItemManager.NazwaENG[SklepS.Slots[WybranySlotSklep]] + "\n" + "Type : " + ItemManager.TypeNameENG[SklepS.Slots[WybranySlotSklep]] + "\n" + "Required strength : " + ItemManager.ReqStr[SklepS.Slots[WybranySlotSklep]] + "\n" + "Defense : " + ItemManager.Defense[SklepS.Slots[WybranySlotSklep]] + "\n" + "Cost(Buy) : " + ItemManager.Cost[SklepS.Slots[WybranySlotSklep]],Styl);
					}
					if(ItemManager.ReqStr[SklepS.Slots[WybranySlotSklep]] > PlayerMainScript.Str)
					{
						GUI.Label(Rect(Screen.width * 0.1,Screen.height * 0.35,Screen.width * 0.35,Screen.height * 0.3),"Name : " + ItemManager.NazwaENG[SklepS.Slots[WybranySlotSklep]] + "\n" + "Type : " + ItemManager.TypeNameENG[SklepS.Slots[WybranySlotSklep]] + "\n" + "Required strength : " + ItemManager.ReqStr[SklepS.Slots[WybranySlotSklep]] + "\n" + "Defense : " + ItemManager.Defense[SklepS.Slots[WybranySlotSklep]] + "\n" + "Cost(Buy) : " + ItemManager.Cost[SklepS.Slots[WybranySlotSklep]],StylEquiqable);
					}
				}
				if(SklepS.Slots[WybranySlotSklep] > 80 && SklepS.Slots[WybranySlotSklep] <= 100)
				{
					GUI.Label(Rect(Screen.width * 0.1,Screen.height * 0.35,Screen.width * 0.35,Screen.height * 0.3),"Name : " + ItemManager.NazwaENG[SklepS.Slots[WybranySlotSklep]] + "\n" + "Type : " + ItemManager.TypeNameENG[SklepS.Slots[WybranySlotSklep]] + "\n" + "Plus strength : " + ItemManager.StrPlus[SklepS.Slots[WybranySlotSklep]] + "\n" + "Plus dexterity : " + ItemManager.AgiPlus[SklepS.Slots[WybranySlotSklep]] + "\n" + "Plus vitality : " + ItemManager.EngPlus[SklepS.Slots[WybranySlotSklep]] + "\n" + "Cost(Buy) : " + ItemManager.Cost[SklepS.Slots[WybranySlotSklep]],Styl);
				}
				if(WybranySlotSklep > -1)
				{
					if(Gold >= ItemManager.Cost[SklepS.Slots[WybranySlotSklep]])
					{
						if(SklepS.Slots[WybranySlotSklep] == 2)
						{
							if(GUI.Button(Rect(Screen.width * 0.235,Screen.height * 0.7,Screen.width * 0.075,Screen.width * 0.075),"",BuyTexture))
							{
								Gold -= ItemManager.Cost[SklepS.Slots[WybranySlotSklep]];
								Quests.IloscZadania[13] += ItemManager.Cost[SklepS.Slots[WybranySlotSklep]];
								SklepS.Slots[WybranySlotSklep] = 0;
								WybranySlotChest = -1;
								WybranySlotSklep = -1;
								WybranySlot = -1;
								Potions++;
							}
						}
						else
						{
							for(var deen = 0; deen < Slots.length; deen++)
							{
								if(Slots[deen] == 0)
								{
									if(GUI.Button(Rect(Screen.width * 0.235,Screen.height * 0.7,Screen.width * 0.075,Screen.width * 0.075),"",BuyTexture))
									{
										Gold -= ItemManager.Cost[SklepS.Slots[WybranySlotSklep]];
										Quests.IloscZadania[13] += ItemManager.Cost[SklepS.Slots[WybranySlotSklep]];
										Slots[deen] = SklepS.Slots[WybranySlotSklep];
										SklepS.Slots[WybranySlotSklep] = 0;
										WybranySlotChest = -1;
										WybranySlotSklep = -1;
										WybranySlot = -1;
										WybranyEquiped = false;
									}
								}
							}
						}
					}
				}
			}
		}
			if(WybranySlot > -1 || WybranyEquiped)
			{
				if(!WybranyEquiped)
				{
					GUI.depth = -2;
					GUI.Button(Rect(SlotPos[WybranySlot].x,SlotPos[WybranySlot].y,SlotSize,SlotSize),"",Zaznaczony);
					GUI.depth = 1;
					if(ItemManager.Type[Slots[WybranySlot]] == 8)
					{
						if(Slots[WybranySlot] == 2)
						{
							if(PlayerMainScript.Hp < PlayerMainScript.MaxHp)
							{
								if(GUI.Button(Rect(Screen.width * 0.9,Screen.height * 0.35,Screen.width * 0.075,Screen.width * 0.075),"",UseTexture))
								{
									PlayerMainScript.Hp += PlayerMainScript.MaxHp * 0.25;
									Slots[WybranySlot] = 0;
									WybranySlot = -1;
									WybranySlotChest = -1;
									return;
								}
							}
							GUI.depth = -2;
							GUI.Button(Rect(SlotPos[WybranySlot].x,SlotPos[WybranySlot].y,SlotSize,SlotSize),"",Zaznaczony);
							GUI.depth = 1;		
							if(!Sklep)
							{
								GUI.Label(Rect(Screen.width * 0.55,Screen.height * 0.2,Screen.width * 0.4,Screen.height * 0.2),"Name : " + ItemManager.NazwaENG[Slots[WybranySlot]] + "\n" + "Type : " + ItemManager.TypeNameENG[Slots[WybranySlot]] + "\n" + "Cost(Buy) : " + ItemManager.Cost[Slots[WybranySlot]],Styl);
							}
							if(Sklep)
							{
								GUI.Label(Rect(Screen.width * 0.55,Screen.height * 0.2,Screen.width * 0.4,Screen.height * 0.2),"Name : " + ItemManager.NazwaENG[Slots[WybranySlot]] + "\n" + "Type : " + ItemManager.TypeNameENG[Slots[WybranySlot]] + "\n" + "Cost(sell) : " + Mathf.Round((ItemManager.Cost[Slots[WybranySlot]] * 0.125)),Styl);
							}
							GUI.depth = 0;
						}
						if(Slots[WybranySlot] == 3)
						{
							if(GUI.Button(Rect(Screen.width * 0.9,Screen.height * 0.35,Screen.width * 0.075,Screen.width * 0.075),"",UseTexture))
							{
								PlayerMainScript.StrPoints += 1;
								Quests.IloscZadania[10]++;
								Slots[WybranySlot] = 0;
								WybranySlot = -1;
								WybranySlotChest = -1;
								return;
							}
							GUI.depth = -2;
							GUI.Button(Rect(SlotPos[WybranySlot].x,SlotPos[WybranySlot].y,SlotSize,SlotSize),"",Zaznaczony);
							GUI.depth = 1;				
							if(!Sklep)
							{
								GUI.Label(Rect(Screen.width * 0.55,Screen.height * 0.2,Screen.width * 0.4,Screen.height * 0.2),"Name : " + ItemManager.NazwaENG[Slots[WybranySlot]] + "\n" + "Type : " + ItemManager.TypeNameENG[Slots[WybranySlot]] + "\n" + "Cost(Buy) : " + ItemManager.Cost[Slots[WybranySlot]],Styl);
							}
							if(Sklep)
							{
								GUI.Label(Rect(Screen.width * 0.55,Screen.height * 0.2,Screen.width * 0.4,Screen.height * 0.2),"Name : " + ItemManager.NazwaENG[Slots[WybranySlot]] + "\n" + "Type : " + ItemManager.TypeNameENG[Slots[WybranySlot]] + "\n" + "Cost(sell) : " + (ItemManager.Cost[Slots[WybranySlot]] * 0.125),Styl);
							}
							GUI.depth = 0;
						}
						if(Slots[WybranySlot] == 4)
						{
							if(GUI.Button(Rect(Screen.width * 0.9,Screen.height * 0.35,Screen.width * 0.075,Screen.width * 0.075),"",UseTexture))
							{
								PlayerMainScript.AgiPoints += 1;
								Quests.IloscZadania[10]++;
								Slots[WybranySlot] = 0;
								WybranySlot = -1;
								WybranySlotChest = -1;
								return;
							}
							GUI.depth = -2;
							GUI.Button(Rect(SlotPos[WybranySlot].x,SlotPos[WybranySlot].y,SlotSize,SlotSize),"",Zaznaczony);
							GUI.depth = 1;				
							if(!Sklep)
							{
								GUI.Label(Rect(Screen.width * 0.55,Screen.height * 0.2,Screen.width * 0.4,Screen.height * 0.2),"Name : " + ItemManager.NazwaENG[Slots[WybranySlot]] + "\n" + "Type : " + ItemManager.TypeNameENG[Slots[WybranySlot]] + "\n" + "Cost(Buy) : " + ItemManager.Cost[Slots[WybranySlot]],Styl);
							}
							if(Sklep)
							{
								GUI.Label(Rect(Screen.width * 0.55,Screen.height * 0.2,Screen.width * 0.4,Screen.height * 0.2),"Name : " + ItemManager.NazwaENG[Slots[WybranySlot]] + "\n" + "Type : " + ItemManager.TypeNameENG[Slots[WybranySlot]] + "\n" + "Cost(sell) : " + Mathf.Round((ItemManager.Cost[Slots[WybranySlot]] * 0.125)),Styl);
							}
							GUI.depth = 0;
						}
						if(Slots[WybranySlot] == 5)
						{
							if(GUI.Button(Rect(Screen.width * 0.9,Screen.height * 0.35,Screen.width * 0.075,Screen.width * 0.075),"",UseTexture))
							{
								PlayerMainScript.EngPoints += 1;
								PlayerMainScript.Hp += 10;
								Quests.IloscZadania[10]++;
								Slots[WybranySlot] = 0;
								WybranySlot = -1;
								WybranySlotChest = -1;
								return;
							}
							GUI.depth = -2;
							GUI.Button(Rect(SlotPos[WybranySlot].x,SlotPos[WybranySlot].y,SlotSize,SlotSize),"",Zaznaczony);
							GUI.depth = 1;				
							if(!Sklep)
							{
								GUI.Label(Rect(Screen.width * 0.55,Screen.height * 0.2,Screen.width * 0.4,Screen.height * 0.2),"Name : " + ItemManager.NazwaENG[Slots[WybranySlot]] + "\n" + "Type : " + ItemManager.TypeNameENG[Slots[WybranySlot]] + "\n" + "Cost(Buy) : " + ItemManager.Cost[Slots[WybranySlot]],Styl);
							}
							if(Sklep)
							{
								GUI.Label(Rect(Screen.width * 0.55,Screen.height * 0.2,Screen.width * 0.4,Screen.height * 0.2),"Name : " + ItemManager.NazwaENG[Slots[WybranySlot]] + "\n" + "Type : " + ItemManager.TypeNameENG[Slots[WybranySlot]] + "\n" + "Cost(sell) : " + Mathf.Round((ItemManager.Cost[Slots[WybranySlot]] * 0.125)),Styl);
							}
							GUI.depth = 0;
						}
						if(Slots[WybranySlot] == 6)
						{
							if(GUI.Button(Rect(Screen.width * 0.9,Screen.height * 0.35,Screen.width * 0.075,Screen.width * 0.075),"",UseTexture))
							{
								PlayerMainScript.Exp += PlayerMainScript.NextLv * 0.1;
								Slots[WybranySlot] = 0;
								WybranySlot = -1;
								WybranySlotChest = -1;
								return;
							}
							GUI.depth = -2;
							GUI.Button(Rect(SlotPos[WybranySlot].x,SlotPos[WybranySlot].y,SlotSize,SlotSize),"",Zaznaczony);
							GUI.depth = 1;				
							if(!Sklep)
							{
								GUI.Label(Rect(Screen.width * 0.55,Screen.height * 0.2,Screen.width * 0.4,Screen.height * 0.2),"Name : " + ItemManager.NazwaENG[Slots[WybranySlot]] + "\n" + "Type : " + ItemManager.TypeNameENG[Slots[WybranySlot]] + "\n" + "Cost(Buy) : " + ItemManager.Cost[Slots[WybranySlot]],Styl);
							}
							if(Sklep)
							{
								GUI.Label(Rect(Screen.width * 0.55,Screen.height * 0.2,Screen.width * 0.4,Screen.height * 0.2),"Name : " + ItemManager.NazwaENG[Slots[WybranySlot]] + "\n" + "Type : " + ItemManager.TypeNameENG[Slots[WybranySlot]] + "\n" + "Cost(sell) : " + Mathf.Round((ItemManager.Cost[Slots[WybranySlot]] * 0.125)),Styl);
							}
							GUI.depth = 0;
						}
					}
					if(ItemManager.Type[Slots[WybranySlot]] == 0)
					{
						if(ItemManager.ReqStr[Slots[WybranySlot]] <= PlayerMainScript.Str && ItemManager.ReqAgi[Slots[WybranySlot]] <= PlayerMainScript.Agi)
						{
							if(!Sklep)
							{
								GUI.Label(Rect(Screen.width * 0.55,Screen.height * 0.2,Screen.width * 0.4,Screen.height * 0.2),"Name : " + ItemManager.NazwaENG[Slots[WybranySlot]] + "\n" + "Type : " + ItemManager.TypeNameENG[Slots[WybranySlot]] + "\n" + "Required strength : " + ItemManager.ReqStr[Slots[WybranySlot]] + "\n" + "Required dexterity : " + ItemManager.ReqAgi[Slots[WybranySlot]] + "\n" + "Damage : " + ItemManager.Damage[Slots[WybranySlot]] + "\n" + "Cost(Buy) : " + ItemManager.Cost[Slots[WybranySlot]],Styl);
							}
							if(Sklep)
							{
								GUI.Label(Rect(Screen.width * 0.55,Screen.height * 0.2,Screen.width * 0.4,Screen.height * 0.2),"Name : " + ItemManager.NazwaENG[Slots[WybranySlot]] + "\n" + "Type : " + ItemManager.TypeNameENG[Slots[WybranySlot]] + "\n" + "Required strength : " + ItemManager.ReqStr[Slots[WybranySlot]] + "\n" + "Required dexterity : " + ItemManager.ReqAgi[Slots[WybranySlot]] + "\n" + "Damage : " + ItemManager.Damage[Slots[WybranySlot]] + "\n" + "Cost(sell) : " + Mathf.Round((ItemManager.Cost[Slots[WybranySlot]] * 0.125)),Styl);
							}
						}
						else
						{
							if(ItemManager.ReqStr[Slots[WybranySlot]] > PlayerMainScript.Str)
							{
								if(!Sklep)
								{
									GUI.Label(Rect(Screen.width * 0.55,Screen.height * 0.2,Screen.width * 0.4,Screen.height * 0.2),"Name : " + ItemManager.NazwaENG[Slots[WybranySlot]] + "\n" + "Type : " + ItemManager.TypeNameENG[Slots[WybranySlot]] + "\n" + "Required strength : " + ItemManager.ReqStr[Slots[WybranySlot]] + "\n" + "Required dexterity : " + ItemManager.ReqAgi[Slots[WybranySlot]] + "\n" + "Damage : " + ItemManager.Damage[Slots[WybranySlot]] + "\n" + "Cost(Buy) : " + ItemManager.Cost[Slots[WybranySlot]],StylEquiqable);
								}
								if(Sklep)
								{
									GUI.Label(Rect(Screen.width * 0.55,Screen.height * 0.2,Screen.width * 0.4,Screen.height * 0.2),"Name : " + ItemManager.NazwaENG[Slots[WybranySlot]] + "\n" + "Type : " + ItemManager.TypeNameENG[Slots[WybranySlot]] + "\n" + "Required strength : " + ItemManager.ReqStr[Slots[WybranySlot]] + "\n" + "Required dexterity : " + ItemManager.ReqAgi[Slots[WybranySlot]] + "\n" + "Damage : " + ItemManager.Damage[Slots[WybranySlot]] + "\n" + "Cost(sell) : " + Mathf.Round((ItemManager.Cost[Slots[WybranySlot]] * 0.125)),StylEquiqable);
								}
							}
							if(ItemManager.ReqAgi[Slots[WybranySlot]] > PlayerMainScript.Agi)
							{
								if(!Sklep)
								{
									GUI.Label(Rect(Screen.width * 0.55,Screen.height * 0.2,Screen.width * 0.4,Screen.height * 0.2),"Name : " + ItemManager.NazwaENG[Slots[WybranySlot]] + "\n" + "Type : " + ItemManager.TypeNameENG[Slots[WybranySlot]] + "\n" + "Required strength : " + ItemManager.ReqStr[Slots[WybranySlot]] + "\n" + "Required dexterity : " + ItemManager.ReqAgi[Slots[WybranySlot]] + "\n" + "Damage : " + ItemManager.Damage[Slots[WybranySlot]] + "\n" + "Cost(Buy) : " + ItemManager.Cost[Slots[WybranySlot]],StylEquiqable);
								}
								if(Sklep)
								{
									GUI.Label(Rect(Screen.width * 0.55,Screen.height * 0.2,Screen.width * 0.4,Screen.height * 0.2),"Name : " + ItemManager.NazwaENG[Slots[WybranySlot]] + "\n" + "Type : " + ItemManager.TypeNameENG[Slots[WybranySlot]] + "\n" + "Required strength : " + ItemManager.ReqStr[Slots[WybranySlot]] + "\n" + "Required dexterity : " + ItemManager.ReqAgi[Slots[WybranySlot]] + "\n" + "Damage : " + ItemManager.Damage[Slots[WybranySlot]] + "\n" + "Cost(sell) : " + Mathf.Round((ItemManager.Cost[Slots[WybranySlot]] * 0.125)),StylEquiqable);
								}
							}
						}
					}
					if(ItemManager.Type[Slots[WybranySlot]] > 0 && ItemManager.Type[Slots[WybranySlot]] <= 5)
					{
						if(ItemManager.ReqStr[Slots[WybranySlot]] <= PlayerMainScript.Str)
						{
							if(!Sklep)
							{
								GUI.Label(Rect(Screen.width * 0.55,Screen.height * 0.2,Screen.width * 0.4,Screen.height * 0.2),"Name : " + ItemManager.NazwaENG[Slots[WybranySlot]] + "\n" + "Type : " + ItemManager.TypeNameENG[Slots[WybranySlot]] + "\n" + "Required strength : " + ItemManager.ReqStr[Slots[WybranySlot]] + "\n" + "Defense : " + ItemManager.Defense[Slots[WybranySlot]] + "\n" + "Cost(Buy) : " + ItemManager.Cost[Slots[WybranySlot]],Styl);
							}
							if(Sklep)
							{
								GUI.Label(Rect(Screen.width * 0.55,Screen.height * 0.2,Screen.width * 0.4,Screen.height * 0.2),"Name : " + ItemManager.NazwaENG[Slots[WybranySlot]] + "\n" + "Type : " + ItemManager.TypeNameENG[Slots[WybranySlot]] + "\n" + "Required strength : " + ItemManager.ReqStr[Slots[WybranySlot]] + "\n" + "Defense : " + ItemManager.Defense[Slots[WybranySlot]] + "\n" + "Cost(sell) : " + Mathf.Round((ItemManager.Cost[Slots[WybranySlot]] * 0.125)),Styl);
							}
						}
						else
						{
							if(!Sklep)
							{
								GUI.Label(Rect(Screen.width * 0.55,Screen.height * 0.2,Screen.width * 0.4,Screen.height * 0.2),"Name : " + ItemManager.NazwaENG[Slots[WybranySlot]] + "\n" + "Type : " + ItemManager.TypeNameENG[Slots[WybranySlot]] + "\n" + "Required strength : " + ItemManager.ReqStr[Slots[WybranySlot]] + "\n" + "Required dexterity : " + ItemManager.ReqAgi[Slots[WybranySlot]] + "\n" + "Damage : " + ItemManager.Damage[Slots[WybranySlot]] + "\n" + "Cost(Buy) : " + ItemManager.Cost[Slots[WybranySlot]],StylEquiqable);
							}
							if(Sklep)
							{
								GUI.Label(Rect(Screen.width * 0.55,Screen.height * 0.2,Screen.width * 0.4,Screen.height * 0.2),"Name : " + ItemManager.NazwaENG[Slots[WybranySlot]] + "\n" + "Type : " + ItemManager.TypeNameENG[Slots[WybranySlot]] + "\n" + "Required strength : " + ItemManager.ReqStr[Slots[WybranySlot]] + "\n" + "Required dexterity : " + ItemManager.ReqAgi[Slots[WybranySlot]] + "\n" + "Damage : " + ItemManager.Damage[Slots[WybranySlot]] + "\n" + "Cost(sell) : " + Mathf.Round((ItemManager.Cost[Slots[WybranySlot]] * 0.125)),StylEquiqable);
							}
						}
					}
					if(ItemManager.Type[Slots[WybranySlot]] == 6 || ItemManager.Type[Slots[WybranySlot]] == 7)
					{
						if(!Sklep)
						{
							GUI.Label(Rect(Screen.width * 0.55,Screen.height * 0.2,Screen.width * 0.4,Screen.height * 0.2),"Name : " + ItemManager.NazwaENG[Slots[WybranySlot]] + "\n" + "Type : " + ItemManager.TypeNameENG[Slots[WybranySlot]] + "\n" + "Plus strength : " + ItemManager.StrPlus[Slots[WybranySlot]] + "\n" + "Plus dexterity : " + ItemManager.AgiPlus[Slots[WybranySlot]] + "\n" + "Plus vitality : " + ItemManager.EngPlus[Slots[WybranySlot]] + "\n" + "Cost(Buy) : " + ItemManager.Cost[Slots[WybranySlot]],Styl);
							GUI.depth = 0;
						}
						if(Sklep)
						{
							GUI.Label(Rect(Screen.width * 0.55,Screen.height * 0.2,Screen.width * 0.4,Screen.height * 0.2),"Name : " + ItemManager.NazwaENG[Slots[WybranySlot]] + "\n" + "Type : " + ItemManager.TypeNameENG[Slots[WybranySlot]] + "\n" + "Plus strength : " + ItemManager.StrPlus[Slots[WybranySlot]] + "\n" + "Plus dexterity : " + ItemManager.AgiPlus[Slots[WybranySlot]] + "\n" + "Plus vitality : " + ItemManager.EngPlus[Slots[WybranySlot]] + "\n" + "Cost(sell) : " + Mathf.Round((ItemManager.Cost[Slots[WybranySlot]] * 0.125)),Styl);
							GUI.depth = 0;
						}
					}
					if(!Sklep)
					{
						if(GUI.Button(Rect(Screen.width * 0.9,Screen.height * 0.2,Screen.width * 0.075,Screen.width * 0.075),"",ThrowTexture))
						{
							WyrzucanyItem = WybranySlot;
							WyrzucItem();
							WybranySlot = -1;
							WybranySlotChest = -1;
							return;
						}
					}
					if(Sklep)
					{
						if(GUI.Button(Rect(Screen.width * 0.9,Screen.height * 0.2,Screen.width * 0.075,Screen.width * 0.075),"",SellTexture))
						{
							Gold += Mathf.Round(ItemManager.Cost[Slots[WybranySlot]] * 0.125);
							Quests.IloscZadania[8] += Mathf.Round(ItemManager.Cost[Slots[WybranySlot]] * 0.125);
							Slots[WybranySlot] = 0;
							WybranySlot = -1;
							WybranySlotChest = -1;
							WybranySlotSklep = -1;
							return;
						}
					}
					if(ItemManager.Equiqable[Slots[WybranySlot]] == 1)
					{
						if(ItemManager.ReqStr[Slots[WybranySlot]] <= PlayerMainScript.Str && ItemManager.ReqAgi[Slots[WybranySlot]] <= PlayerMainScript.Agi)
						{
							if(GUI.Button(Rect(Screen.width * 0.9,Screen.height * 0.35,Screen.width * 0.075,Screen.width * 0.075),"",EquipTexture))
							{
								if(Slots[WybranySlot] != 0)
								{
									var TypE = ItemManager.Type[Slots[WybranySlot]];
									var WymienianyE = 0;
									WymienianyE = Equiped[TypE];
									if(ItemManager.Type[Slots[WybranySlot]] == 6 || ItemManager.Type[Slots[WybranySlot]] == 7)
									{
										PlayerMainScript.MaxHp = (PlayerMainScript.Eng * 10) + 45 + (PlayerMainScript.Lv * 5);
										PlayerMainScript.Hp += ItemManager.EngPlus[Slots[WybranySlot]] * 10;
									}
									Equiped[TypE] = Slots[WybranySlot];
									Slots[WybranySlot] = WymienianyE;
									if(ItemManager.Type[Slots[WybranySlot]] == 0)
									{
										if(Equiped[0] == 14 || Equiped[0] == 17 || Equiped[0] == 21 || Equiped[0] == 25 || Equiped[0] == 29)
										{
											LiniaStrzaluRenderer.material = LiniaWidac;
											Destroy(AktualnaBron);
											AktualnaBron = null;
											AktualnaBron = Instantiate(ItemManager.ModeleBron[Equiped[0]],PunktAtakuLuk.position,PunktAtakuLuk.rotation);
											AktualnaBron.transform.parent = PunktAtakuLuk;
										}
										else
										{
											LiniaStrzaluRenderer.material = LiniaNieWidac;
											Destroy(AktualnaBron);
											AktualnaBron = null;
											AktualnaBron = Instantiate(ItemManager.ModeleBron[Equiped[0]],PunktAtakuMiecz.position,PunktAtakuMiecz.rotation);
											AktualnaBron.transform.parent = PunktAtakuMiecz;
										}
									}
									WymienianyE = 0;
									TypE = 0;
									WybranySlot = -1;
									WybranySlotChest = -1;
									WybranySlotSklep = -1;
									return;
								}
							}
						}
					}
				}
				if(WybranyEquiped)
				{
					if(ItemManager.Type[Equiped[WybranySlot]] == 0)
					{
						GUI.depth = -2;
						GUI.Button(Rect((slotPos[WybranySlot].x * Screen.width) + (Screen.width * 0.05)  - (0.0225 * Screen.width),Screen.height * 0.1,Screen.width * 0.045,Screen.width * 0.045),"",Zaznaczony);
						GUI.depth = 1;
						GUI.Label(Rect(Screen.width * 0.55,Screen.height * 0.2,Screen.width * 0.4,Screen.height * 0.2),"Name : " + ItemManager.NazwaENG[Equiped[WybranySlot]] + "\n" + "Type : " + ItemManager.TypeNameENG[Equiped[WybranySlot]] + "\n" + "Required strength : " + ItemManager.ReqStr[Equiped[WybranySlot]] + "\n" + "Required dexterity : " + ItemManager.ReqAgi[Equiped[WybranySlot]] + "\n" + "Damage : " + ItemManager.Damage[Equiped[WybranySlot]] + "\n" + "Cost(Buy) : " + ItemManager.Cost[Equiped[WybranySlot]],Styl);
						GUI.depth = 0;
					}
					if(ItemManager.Type[Equiped[WybranySlot]] > 0 && ItemManager.Type[Equiped[WybranySlot]] <= 5)
					{
						GUI.depth = -2;
						GUI.Button(Rect((slotPos[WybranySlot].x * Screen.width) + (Screen.width * 0.05)  - (0.0225 * Screen.width),Screen.height * 0.1,Screen.width * 0.045,Screen.width * 0.045),"",Zaznaczony);
						GUI.depth = 1;
						GUI.Label(Rect(Screen.width * 0.55,Screen.height * 0.2,Screen.width * 0.4,Screen.height * 0.2),"Name : " + ItemManager.NazwaENG[Equiped[WybranySlot]] + "\n" + "Type : " + ItemManager.TypeNameENG[Equiped[WybranySlot]] + "\n" + "Required strength : " + ItemManager.ReqStr[Equiped[WybranySlot]] + "\n" + "Defense : " + ItemManager.Defense[Equiped[WybranySlot]] + "\n" + "Cost(Buy) : " + ItemManager.Cost[Equiped[WybranySlot]],Styl);
						GUI.depth = 0;
					}
					if(ItemManager.Type[Equiped[WybranySlot]] == 6 || ItemManager.Type[Equiped[WybranySlot]] == 7)
					{
						GUI.depth = -2;
						GUI.Button(Rect((slotPos[WybranySlot].x * Screen.width) + (Screen.width * 0.05)  - (0.0225 * Screen.width),Screen.height * 0.1,Screen.width * 0.045,Screen.width * 0.045),"",Zaznaczony);
						GUI.depth = 1;
						GUI.Label(Rect(Screen.width * 0.55,Screen.height * 0.2,Screen.width * 0.4,Screen.height * 0.2),"Name : " + ItemManager.NazwaENG[Equiped[WybranySlot]] + "\n" + "Type : " + ItemManager.TypeNameENG[Equiped[WybranySlot]] + "\n" + "Plus strength : " + ItemManager.StrPlus[Equiped[WybranySlot]] + "\n" + "Plus dexterity : " + ItemManager.AgiPlus[Equiped[WybranySlot]] + "\n" + "Plus vitality : " + ItemManager.EngPlus[Equiped[WybranySlot]] + "\n" + "Cost(Buy) : " + ItemManager.Cost[Equiped[WybranySlot]],Styl);
						for(var ten = 0; ten < Slots.length; ten++)
						{
							if(Slots[ten] == 0)
							{
								if(GUI.Button(Rect(Screen.width * 0.9,Screen.height * 0.35,Screen.width * 0.075,Screen.width * 0.075),"",UnEquipTexture))
								{
									Slots[ten] = Equiped[WybranySlot];
									Equiped[WybranySlot] = 0;
									WybranySlot = -1;
									WybranyEquiped = false;
								}
							}
						}
					}
				}
			}
		}
		if(Full)
		{
			GUI.Label(Rect(Screen.width * 0.4,Screen.height * 0.4,Screen.width * 0.2,Screen.height * 0.2),"Pełny ekwipunek",SrodekNapis);
		}
		if(!Skrzynia)
		{
			WybranySlotChest = 0;
		}	
		if(WlaczanieSklepu)
		{
			if(!Sklep && !Skrzynia && !Escape.Menu && !PlayerMainScript.Stats && !MapScript.Map && !PlayerMainScript.Teleport && !LoadingText.Loading && !LoadingText.Dead && !Eq && !Quests.Quests && !Spells.SpellBook && !PlayerAttackScript.ActivatedSpell && !Rewards.RewardMenu)
			{
				GUI.depth = 1;
				if(GUI.Button(Rect(Screen.width * 0.9,(Screen.height * 0.225) + (Screen.width * 0.075),Screen.width * 0.075,Screen.width * 0.075),"",StylSklepButton))
				{
					SklepS = SklepGM.GetComponent("Sklep");
					WybranySlotSklep = -1;
					Eq = true;
					Sklep = true;
					WybranySlot = -1;
					WybranyEquiped = false;
					for(var qen = 0; qen < Slots.length; qen++)
					{
						SlotPos[qen].x = slotPos[qen].x * Screen.width;
						SlotPos[qen].y = -(slotPos[qen].y * Screen.height) + Screen.height;
					}
				}
				GUI.depth = 0;
			}
		}		
		if(OtwieranieSkrzyni)
		{
			if(!Sklep && !Skrzynia && !Escape.Menu && !PlayerMainScript.Stats && !MapScript.Map && !PlayerMainScript.Teleport && !LoadingText.Loading && !LoadingText.Dead && !Eq && !Quests.Quests && !Spells.SpellBook && !PlayerAttackScript.ActivatedSpell && !Rewards.RewardMenu)
			{
				GUI.depth = 1;
				if(GUI.Button(Rect(Screen.width * 0.9,(Screen.height * 0.225) + (Screen.width * 0.075),Screen.width * 0.075,Screen.width * 0.075),"",StylChestButton))
				{
					ChestAudioSource.clip = ChestOpen;
					ChestAudioSource.Play();
					ChestS = SkrzynkaGM.GetComponent("Skrzynia");
					WybranySlotChest = -1;
					Eq = true;
					Skrzynia = true;
					WybranySlot = -1;
					WybranyEquiped = false;
					CosJestSkrzynia = false;
					for(var aben = 0; aben < Slots.length; aben++)
					{
						SlotPos[aben].x = slotPos[aben].x * Screen.width;
						SlotPos[aben].y = -(slotPos[aben].y * Screen.height) + Screen.height;
					}
					for(var bcen = 0; bcen < ChestS.Slots.length; bcen++)
					{
						if(ChestS.Slots[bcen] > 0)
						{
							CosJestSkrzynia = true;
						}
					}
				}
				GUI.depth = 0;
			}
		}	
		if(NieZdatnaDoUzytku)
		{
			GUI.Label(Rect(Screen.width * 0.3,Screen.height * 0.4,Screen.width * 0.4,Screen.height * 0.2),"Postać nie zdatna do użytku",StylNapis1);
		}
		for(var sen = 0; sen < 6; sen++)
		{
			if(PlayerMainScript.Str < ItemManager.ReqStr[Equiped[sen]])
			{
				NieZdatnaDoUzytku = true;
				return;
			}
			if(PlayerMainScript.Agi < ItemManager.ReqAgi[Equiped[sen]])
			{
				NieZdatnaDoUzytku = true;
				return;
			}
			else
			{
				NieZdatnaDoUzytku = false;
				return;
			}
		}
	}
}

function OnTriggerEnter(other : Collider)
{
	if(other.gameObject.tag == "Item")
	{
		yield WaitForSeconds(0.05);
		if(DodawanyItem != 0)
		{
			if(DodawanyItem == 1)
			{
				Gold += DodawaneZloto;
				DodawaneZloto = 0;
				DodawanyItem = 0;
				Destroy(other.gameObject);
				return;
			}
			if(DodawanyItem == 2)
			{
				Potions++;
				DodawanyItem = 0;
				Destroy(other.gameObject);
			}
			else
			{
				for(var i = 0; i < Slots.length; i++)
				{
					if(Slots[i] == 0)
					{
						Slots[i] = DodawanyItem;
						DodawanyItem = 0;
						Destroy(other.gameObject);
						return;
					}
				}
				DodawanyItem = 0;
				Full = true;
				yield WaitForSeconds(0.1);
				Full = false;
				return;
			}
		}
		return;
	}
	if(other.gameObject.tag == "Chest")
	{
		SkrzynkaGM = other.gameObject;
		OtwieranieSkrzyni = true;
	}
	if(other.gameObject.tag == "Sklep")
	{
		SklepGM = other.gameObject;
		WlaczanieSklepu = true;
	}
}

function OnTriggerExit(other : Collider)
{
	if(other.gameObject.tag == "Chest")
	{
		OtwieranieSkrzyni = false;
	}
	if(other.gameObject.tag == "Beczka")
	{
		RozbijanieBeczki = false;
	}
	if(other.gameObject.tag == "Sklep")
	{
		WlaczanieSklepu = false;
	}
}

function IluRecznaBron()
{
	if(Equiped[0] == 14 || Equiped[0] == 17 || Equiped[0] == 21 || Equiped[0] == 22 || Equiped[0] == 23 || Equiped[0] == 25 ||  Equiped[0] == 26 || Equiped[0] == 27 ||  Equiped[0] == 28 || Equiped[0] == 29 || Equiped[0] == 30)
	{
		BronIluReczna = 2;
	}
	else
	{
		BronIluReczna = 1;
	}
}
