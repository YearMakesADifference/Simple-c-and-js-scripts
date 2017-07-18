#pragma strict

var AtakIcon : GUIStyle;
var BlockIcon : GUIStyle;
var AnulujZaznaczenie : GUIStyle;
static var Chod = false;
var Anim : Animation;
static var MoznaIsc = false;
static var MoznaAtakowac = false;
static var Atak = false;
static var RozbijanieBeczki = false;
private var BeczkaGM : GameObject;
private var BeczkaS : BarellScript;
static var AtakMieczAnimTime = 0.0;
private var Player : Transform;
static var MinDmg = 0.0;
static var MaxDmg = 0.0;
private var AvgDmg = 0.0;
static var AtakMieczDist = 0.0;
var atakMieczDist = 0.0;
static var Uderzono = false;
var PunktStrzalu : Transform;
var Strzala : GameObject;
var AttackSwordSound : AudioSource;
var AttackBowSound : AudioSource;
var WalkSound : AudioSource;
private var TouchPoint : Vector2;
private var SpellsS : Spells;
static var ActivatedSpell = false;
static var Typ = 0;
private var SkillTimer = 0.0;
private var Dmg = 0.0;
var WojParticlePoint : Transform;
var SpellAttackPoint : Transform;
private var Particles : GameObject;
private var EqS : InventoryScript;
private var TouchPos : Vector2;
private var SpellPoint : Vector3;
var PlayerCam : Camera;
private var Arrow : GameObject;
private var ArrowS : Strzala;
private var Czar : GameObject;
private var CzarS : Magic;
var ObrotPostaci : Transform;
static var Blocking = false;

function Awake()
{
	AtakMieczDist = atakMieczDist;
	ActivatedSpell = false;
}

function Start()
{
	Player = GameObject.FindWithTag("Player").transform;
	Typ = PlayerPrefs.GetInt("PlayerType");
	EqS = this.gameObject.GetComponent("InventoryScript");
	ActivatedSpell = false;
	SpellsS = this.gameObject.GetComponent("Spells");
	MoznaIsc = true;
	MoznaAtakowac = true;
	AtakMieczAnimTime = Anim["AtakMiecz"].length;
	Chod = false;
	if(PlayerPrefs.GetInt("Load") == 1)
	{
		SkillTimer = PlayerPrefs.GetFloat("SkillTimer");
	}
	if(PlayerPrefs.GetInt("Load") == 0)
	{
		SkillTimer = 0.0;
	}
}

function Update()
{
	if(Chod)
	{
		MoznaAtakowac = false;
		Anim.Play("Chodzenie");
		if(!WalkSound.isPlaying)
		{
			WalkSound.Play();
		}
		Anim["Chodzenie"].speed = 3.0;
	}
	if(!Chod)
	{
		WalkSound.Stop();
		MoznaAtakowac = true;
		Anim.Stop("Chodzenie");
	}
	if(RozbijanieBeczki)
	{
		if(Atak)
		{
			RozbijanieBeczki = false;
			BeczkaS = BeczkaGM.GetComponent("BarellScript");
			BeczkaS.Rozbij = true;
			BeczkaS = null;
		}
	}
}

function OnGUI()
{
	if(SkillTimer >= SpellsS.Timing[SpellsS.ActiveSpell])
	{
		SkillTimer = SpellsS.Timing[SpellsS.ActiveSpell];
	}
	if(SkillTimer < SpellsS.Timing[SpellsS.ActiveSpell])
	{
		SkillTimer += Time.deltaTime;
	}
	var SkillBar = SkillTimer / SpellsS.Timing[SpellsS.ActiveSpell];
	if(!Escape.Menu)
	{
		if(!InventoryScript.Eq)
		{
			if(!PlayerMainScript.Stats)
			{
				if(!MapScript.Map)
				{
					if(!PlayerMainScript.Teleport)
					{
						if(!Quests.Quests)
						{
							if(!LoadingText.Loading)
							{
								if(!LoadingText.Dead)
								{
									if(!Rewards.RewardMenu)
									{
										if(!Spells.SpellBook)
										{
											GUI.Label(Rect(Screen.width * 0.9,Screen.height * 0.175,Screen.width * 0.075,Screen.width * 0.075),"",SpellsS.BookBackground);
											GUI.Label(Rect(Screen.width * 0.9,Screen.height * 0.175,Screen.width * 0.075,Screen.width * 0.075),"",SpellsS.Empty);
											if(SkillTimer >= SpellsS.Timing[SpellsS.ActiveSpell])
											{
												GUI.Box(Rect(Screen.width * 0.9,(Screen.height * 0.175) + (Screen.width * 0.075),(Screen.width * 0.075) * SkillBar,Screen.height * 0.025),"",SpellsS.SkillLoading);
											}
											if(SkillTimer < SpellsS.Timing[SpellsS.ActiveSpell])
											{
												GUI.Box(Rect(Screen.width * 0.9,(Screen.height * 0.175) + (Screen.width * 0.075),(Screen.width * 0.075) * SkillBar,Screen.height * 0.025),"",SpellsS.SkillNoLoading);
											}
											if(!Chod)
											{
												if(Typ < 2)
												{
													if(GUI.Button(Rect(Screen.width * 0.9,Screen.height * 0.175,Screen.width * 0.075,Screen.width * 0.075),"",SpellsS.Icons[SpellsS.ActiveSpell]))
													{
														if(SkillTimer >= SpellsS.Timing[SpellsS.ActiveSpell])
														{
															if(SpellsS.ActiveSpell < 7)
															{
																if(InventoryScript.Equiped[0] != 14 || InventoryScript.Equiped[0] != 17 || InventoryScript.Equiped[0] != 21 || InventoryScript.Equiped[0] != 25 || InventoryScript.Equiped[0] != 29)
																{
																	if(MoznaAtakowac)
																	{
																		if(!Atak)
																		{
																			AtakMieczFuncSkill(SpellsS.ActiveSpell);
																		}
																	}
																}
															}
															if(SpellsS.ActiveSpell < 14 && SpellsS.ActiveSpell >= 7)
															{
																if(InventoryScript.Equiped[0] == 14 || InventoryScript.Equiped[0] == 17 || InventoryScript.Equiped[0] == 21 || InventoryScript.Equiped[0] == 25 || InventoryScript.Equiped[0] == 29)
																{
																	if(MoznaAtakowac)
																	{
																		if(!Atak)
																		{
																			AtakLukFuncSkill(SpellsS.ActiveSpell);
																		}
																	}
																}
															}
														}
													}
												}
												if(Typ == 2)
												{
													if(!ActivatedSpell)
													{
														if(SkillTimer >= SpellsS.Timing[SpellsS.ActiveSpell])
														{
															for(var e = 0; e < Input.touchCount; e++)
															{
																if(Input.GetTouch(e).phase == TouchPhase.Began)
																{
																	TouchPoint = Input.GetTouch(e).position;
																	TouchPoint.y = (TouchPoint.y - Screen.height) * -1;
																	if(TouchPoint.x > Screen.width * 0.9 && TouchPoint.x < Screen.width)
																	{
																		if(TouchPoint.y > Screen.height * 0.2 && TouchPoint.y < (Screen.height * 0.2) + (Screen.width * 0.075))
																		{
																			TouchPos.x = TouchPoint.x;
																			TouchPos.y = TouchPoint.y;
																			ActivatedSpell = true;
																		}
																	}
																}
															}
														}
													}
													if(ActivatedSpell)
													{
														for(var q = 0; q < Input.touchCount; q++)
														{
															if(Input.GetTouch(q).phase == TouchPhase.Began || Input.GetTouch(q).phase == TouchPhase.Moved)
															{
																TouchPoint = Input.GetTouch(q).position;
																TouchPoint.y = (TouchPoint.y - Screen.height) * -1;
															}
															if(Input.GetTouch(q).phase == TouchPhase.Ended)
															{
																AtakSkill(SpellsS.ActiveSpell);
																ActivatedSpell = false;
																SpellAtack();
															}
														}
														GUI.Label(Rect(TouchPoint.x - (Screen.width * 0.0375),TouchPoint.y - ((Screen.width * 0.075) / 2),Screen.width * 0.075,Screen.width * 0.075),"",SpellsS.Icons[SpellsS.ActiveSpell]);
													}
												}
											}
											if(!ActivatedSpell)
											{
												GUI.Label(Rect(Screen.width * 0.9,Screen.height * 0.175,Screen.width * 0.075,Screen.width * 0.075),"",SpellsS.Icons[SpellsS.ActiveSpell]);
												if(InventoryScript.Equiped[0] == 14 || InventoryScript.Equiped[0] == 17 || InventoryScript.Equiped[0] == 21 || InventoryScript.Equiped[0] == 25 || InventoryScript.Equiped[0] == 29)
												{
													for(var i = 0; i < Input.touchCount; i++)
													{
														if(Input.GetTouch(i).phase == TouchPhase.Began)
														{
															TouchPoint = Input.GetTouch(i).position;
															TouchPoint.y = (TouchPoint.y - Screen.height) * -1;
															if(TouchPoint.x >= Screen.width * 0.7 && TouchPoint.x <= Screen.width * 0.85)
															{
																if(TouchPoint.y >= Screen.height * 0.6 && TouchPoint.y <= Screen.height * 0.8)
																{
																	if(MoznaAtakowac)
																	{
																		if(!Atak)
																		{
																			AtakLukFunc();
																		}
																	}
																}
															}
														}
													}
												}
												else
												{
													GUI.Label(Rect(Screen.width * 0.86,Screen.height * 0.625,Screen.width * 0.1,Screen.width * 0.1),"",BlockIcon);
													for(var r = 0; r < Input.touchCount; r++)
													{
														if(Input.GetTouch(r).phase == TouchPhase.Began)
														{
															TouchPoint = Input.GetTouch(r).position;
															TouchPoint.y = (TouchPoint.y - Screen.height) * -1;
															if(TouchPoint.x >= Screen.width * 0.675 && TouchPoint.x <= Screen.width * 0.825)
															{
																if(TouchPoint.y >= Screen.height * 0.6 && TouchPoint.y <= Screen.height * 0.75)
																{
																	if(MoznaAtakowac)
																	{
																		if(!Atak)
																		{
																			AtakMieczFunc();
																		}
																	}
																}
															}
															else if(TouchPoint.x >= Screen.width * 0.835 && TouchPoint.x <= Screen.width * 0.99)
															{
																if(TouchPoint.y >= Screen.height * 0.6 && TouchPoint.y <= Screen.height * 0.75)
																{
																	if(MoznaAtakowac)
																	{
																		if(!Atak)
																		{
																			BlockFunc();
																		}
																	}
																}
															}
														}
													}
												}
												GUI.Label(Rect(Screen.width * 0.7,Screen.height * 0.625,Screen.width * 0.1,Screen.width * 0.1),"",AtakIcon);
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
	if(ActivatedSpell)
	{
		var ray = PlayerCam.ScreenPointToRay(Input.mousePosition);
        var hit : RaycastHit;
		var LayerMask : int = (1<<0)|(1<<1)|(1<<2)|(1<<3)|(1<<4)|(1<<5)|(1<<6)|(1<<7)|(1<<9)|(1<<10)|(1<<11)|(1<<12)|(1<<13)|(1<<14)|(1<<15);
		if(Physics.Raycast(ray,hit,Mathf.Infinity,LayerMask))
		{
			SpellPoint = hit.point;
			SpellPoint.y = ObrotPostaci.position.y;
		}
	}
}

function SpellAtack()
{
	ObrotPostaci.LookAt(SpellPoint);
	if(SpellsS.ActiveSpell == 14)
	{
		Czar = Instantiate(SpellsS.SkillParticles[SpellsS.ActiveSpell],SpellAttackPoint.position,SpellAttackPoint.rotation);
		CzarS = Czar.GetComponent("Magic");
		CzarS.Damage = SpellsS.Dmg[SpellsS.ActiveSpell];
		CzarS.Speed = 5;
		CzarS = null;
		Czar = null;
	}
}
function AtakLukFunc()
{
	AvgDmg = PlayerMainScript.Damage;
	MinDmg = AvgDmg * 0.75;
	MaxDmg = AvgDmg * 1.25;
	Atak = true;
	MoznaIsc = false;
	Anim["AtakLuk"].speed = 3.25 - (PlayerMainScript.Agi * 0.05);
	Anim.Play("AtakLuk");
	yield WaitForSeconds(Anim["AtakLuk"].length * 0.125);
	Arrow = Instantiate(Strzala,PunktStrzalu.position,PunktStrzalu.rotation);
	ArrowS = Arrow.transform.GetChild(0).gameObject.GetComponent("Strzala");
	ArrowS.Damage = PlayerMainScript.Damage;
	yield WaitForSeconds(Anim["AtakLuk"].length * 0.25);
	Uderzono = true;
	MoznaIsc = true;
	Uderzono = false;
	Atak = false;
}
function AtakLukFuncSkill(Index : int)
{
	if(SpellsS.ActiveSpell == 8)
	{
		Atak = true;
		MoznaIsc = false;
		Anim["AtakLuk"].speed = 3.25 - (PlayerMainScript.Agi * 0.05);
		Anim.Play("AtakLuk");
		yield WaitForSeconds(Anim["AtakLuk"].length * 0.1);
		Arrow = Instantiate(Strzala,PunktStrzalu.position,PunktStrzalu.rotation);
		ArrowS = Arrow.transform.GetChild(0).gameObject.GetComponent("Strzala");
		ArrowS.Damage = PlayerMainScript.Damage;
		Particles = Instantiate(SpellsS.SkillParticles[Index],Arrow.transform.GetChild(1).transform.position,Arrow.transform.rotation);
		Particles.transform.parent = Arrow.transform.GetChild(0).transform;
		Particles = null;
		yield WaitForSeconds(Anim["AtakLuk"].length * 0.05);
		Arrow = Instantiate(Strzala,PunktStrzalu.position,PunktStrzalu.rotation);
		ArrowS = Arrow.gameObject.GetComponent("Strzala");
		ArrowS.Damage = PlayerMainScript.Damage;
		Particles = Instantiate(SpellsS.SkillParticles[Index],Arrow.transform.GetChild(1).transform.position,Arrow.transform.rotation);
		Particles.transform.parent = Arrow.transform;
		Particles = null;
		yield WaitForSeconds(Anim["AtakLuk"].length * 0.25);
		SkillTimer = 0.0;
		PlayerMainScript.Damage = Dmg;
		Uderzono = true;
		MoznaIsc = true;
		Uderzono = false;
		Atak = false;
	}
	if(SpellsS.ActiveSpell != 8)
	{
		Dmg = PlayerMainScript.Damage;
		if(SpellsS.ActiveSpell == 7)
		{	
			PlayerMainScript.Damage += SpellsS.Dmg[SpellsS.ActiveSpell];
			AvgDmg = PlayerMainScript.Damage;
			MinDmg = AvgDmg * 0.75;
			MaxDmg = AvgDmg * 1.25;
		}
		Atak = true;
		MoznaIsc = false;
		Anim["AtakLuk"].speed = 3.25 - (PlayerMainScript.Agi * 0.05);
		Anim.Play("AtakLuk");
		yield WaitForSeconds(Anim["AtakLuk"].length * 0.125);
		var Arrow = Instantiate(Strzala,PunktStrzalu.position,PunktStrzalu.rotation);
		var ArrowS : Strzala;
		ArrowS = Arrow.transform.GetChild(0).gameObject.GetComponent("Strzala");
		ArrowS.Damage = PlayerMainScript.Damage;
		Particles = Instantiate(SpellsS.SkillParticles[Index],Arrow.transform.GetChild(1).transform.position,Arrow.transform.rotation);
		Particles.transform.parent = Arrow.transform.GetChild(0).transform;
		Particles = null;
		yield WaitForSeconds(Anim["AtakLuk"].length * 0.25);
		SkillTimer = 0.0;
		PlayerMainScript.Damage = Dmg;
		Uderzono = true;
		MoznaIsc = true;
		Uderzono = false;
		Atak = false;
	}
}

function AtakMieczFunc()
{
	AvgDmg = PlayerMainScript.Damage;
	MinDmg = AvgDmg * 0.75;
	MaxDmg = AvgDmg * 1.25;
	Atak = true;
	MoznaIsc = false;
	AtakMieczAnimTime = Anim["AtakMiecz"].length * 0.25;
	Anim["AtakMiecz"].speed = 2.25 - (PlayerMainScript.Agi * 0.05);
	Anim.Play("AtakMiecz");
	AttackSwordSound.Play();
	yield WaitForSeconds(Anim["AtakMiecz"].length * 0.25);
	Uderzono = true;
	yield WaitForSeconds(Anim["AtakMiecz"].length * 0.25);
	MoznaIsc = true;
	Uderzono = false;
	Atak = false;
}

function BlockFunc()
{
	Atak = true;
	MoznaIsc = false;
	Anim["PlayerBlock"].speed = 1.5;
	yield WaitForSeconds(Anim["PlayerBlock"].length * 0.1);
	Blocking = true;
	Anim.Play("PlayerBlock");
	yield WaitForSeconds(Anim["PlayerBlock"].length * 0.65);
	MoznaIsc = true;
	Blocking = false;
	Uderzono = false;
	Atak = false;
}

function AtakMieczFuncSkill(Index : int)
{
	Dmg = PlayerMainScript.Damage;
	if(SpellsS.ActiveSpell <= 3)
	{
		PlayerMainScript.Damage += SpellsS.Dmg[SpellsS.ActiveSpell];
		AvgDmg = PlayerMainScript.Damage;
		MinDmg = AvgDmg * 0.75;
		MaxDmg = AvgDmg * 1.25;
	}
	if(SpellsS.ActiveSpell == 4)
	{
		PlayerMainScript.Damage *= 2;
		AvgDmg = PlayerMainScript.Damage;
		MinDmg = AvgDmg * 0.75;
		MaxDmg = AvgDmg * 1.25;
	}
	if(SpellsS.ActiveSpell == 6)
	{
		PlayerMainScript.Damage *= 5;
		AvgDmg = PlayerMainScript.Damage;
		MinDmg = AvgDmg * 0.75;
		MaxDmg = AvgDmg * 1.25;
	}
	Atak = true;
	MoznaIsc = false;
	AtakMieczAnimTime = Anim["AtakMiecz"].length * 0.25;
	Anim["AtakMiecz"].speed = 2.25 - (PlayerMainScript.Agi * 0.05);
	Anim.Play("AtakMiecz");
	AttackSwordSound.Play();
	yield WaitForSeconds(Anim["AtakMiecz"].length * 0.25);
	Particles = Instantiate(SpellsS.SkillParticles[Index],WojParticlePoint.position,WojParticlePoint.rotation);
	Particles.transform.parent = EqS.PunktAtakuMiecz.transform;
	Particles = null;
	Uderzono = true;
	yield WaitForSeconds(Anim["AtakMiecz"].length * 0.25);
	PlayerMainScript.Damage = Dmg;
	SkillTimer = 0.0;
	MoznaIsc = true;
	Uderzono = false;
	Atak = false;
}
function AtakSkill(Index : int)
{
	SkillTimer = 0.0;
}

function OnTriggerEnter(other : Collider)
{
	if(other.gameObject.tag == "Beczka")
	{
		RozbijanieBeczki = true;
		BeczkaGM = other.gameObject;
	}
}


function OnTriggerExit(other : Collider)
{
	if(other.gameObject.tag == "Beczka")
	{
		RozbijanieBeczki = false;
		BeczkaGM = null;
	}
}



