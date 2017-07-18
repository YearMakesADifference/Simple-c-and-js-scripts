#pragma strict

static var Up = 0.0;
static var Right = 0.0;
private var TouchPoint : Vector2;
var joystickPos : Vector2;
private var JoystickPos : Vector2; // Ta liczba pomno¿y siê z screen
var JoystickSize = 0.0; // Ta liczba pomno¿y siê z screen
private var MaxJoystickMove = 0.0;
var maxJoystickMove = 0.0;
private var JoystickMovedPos : Vector2;
var JoystickTex : GUIStyle;
var JoystickTexObrys : GUIStyle;
private var Suma = 0.0;

function Start()
{
	Up = 0.0;
	Right = 0.0;
	TouchPoint = Vector2(0,0);
	JoystickPos.x = joystickPos.x * Screen.width;
	JoystickPos.y = joystickPos.y * Screen.height;
	JoystickMovedPos = JoystickPos;
	Suma = Screen.width + Screen.height;
	MaxJoystickMove = maxJoystickMove * Suma;
	PlayerAttackScript.Chod = false;
}

function Update()
{
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
						if(!LoadingText.Dead)
						{
							if(!LoadingText.Loading)
							{
								if(!Quests.Quests)
								{
									if(!Spells.SpellBook)
									{
										if(!Rewards.RewardMenu)
										{
											if(!PlayerAttackScript.ActivatedSpell)
											{
												if(Suma == Screen.width + Screen.height)
												{
													Suma = Screen.width + Screen.height;
													MaxJoystickMove = maxJoystickMove * Suma;
												}
												if(Suma != Screen.width + Screen.height)
												{
													JoystickPos.x = joystickPos.x * Screen.width;
													JoystickPos.y = joystickPos.y * Screen.height;
													JoystickMovedPos = JoystickPos;
													Suma = Screen.width + Screen.height;
													MaxJoystickMove = maxJoystickMove * Suma;
												}
												for(var i = 0; i < Input.touchCount; i++)
												{
													if(Input.GetTouch(i).phase == TouchPhase.Began || Input.GetTouch(i).phase == TouchPhase.Moved)
													{
														TouchPoint = Input.GetTouch(i).position;
														TouchPoint.y = (TouchPoint.y - Screen.height) * -1;
														if(Vector2.Distance(TouchPoint, JoystickPos) <= MaxJoystickMove)
														{
															JoystickMovedPos.x = TouchPoint.x;
															JoystickMovedPos.y = TouchPoint.y;
															Right = JoystickMovedPos.x - JoystickPos.x;
															Up = JoystickMovedPos.y - JoystickPos.y;
															PlayerRotate.Mozna = true;
														}
													}
													if(Input.GetTouch(i).phase == TouchPhase.Ended)
													{
														JoystickMovedPos = JoystickPos;
														Up = 0;
														Right = 0;
														PlayerAttackScript.Chod = false;
													}
												}
												if(Input.GetKeyDown("w"))
												{
													Up = -50;
												}
												if(Input.GetKeyUp("w"))
												{
													Up = 0;
												}
												if(Input.GetKeyDown("s"))
												{
													Up = 50;
												}
												if(Input.GetKeyUp("s"))
												{
													Up = 0;
												}
												if(Input.GetKeyDown("a"))
												{
													Right = -50;
												}
												if(Input.GetKeyUp("a"))
												{
													Right = 0;
												}
												if(Input.GetKeyDown("d"))
												{
													Right = 50;
												}
												if(Input.GetKeyUp("d"))
												{
													Right = 0;
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
}

function OnGUI()
{
	if(!Escape.Menu)
	{
		if(!InventoryScript.Eq)
		{
			if(!PlayerMainScript.Stats)
			{
				if(!MapScript.Map)
				{
					if(!LoadingText.Loading)
					{
						if(!Quests.Quests)
						{
							if(!LoadingText.Dead)
							{
								if(!PlayerAttackScript.ActivatedSpell)
								{
									if(!Rewards.RewardMenu)
									{
										GUI.depth = 1;
										GUI.Label(Rect(JoystickMovedPos.x - ((JoystickSize / 2) * Screen.width),JoystickMovedPos.y - ((JoystickSize / 2) * Screen.height),	JoystickSize * Screen.width,JoystickSize * Screen.width),"",JoystickTex);
										GUI.depth = 0;
										GUI.Label(Rect(JoystickPos.x - ((JoystickSize / 2) * Screen.width),JoystickPos.y - ((JoystickSize / 2) * Screen.height),JoystickSize * Screen.width,JoystickSize * Screen.width),"",JoystickTexObrys);
										GUI.Label(Rect((JoystickPos.x - ((JoystickSize / 2) * Screen.width) - (JoystickSize * Screen.width)),(JoystickPos.y - ((JoystickSize / 2) * Screen.height) - (JoystickSize * Screen.width)),(JoystickSize * 3) * Screen.width,(JoystickSize * 3) * Screen.width),"",JoystickTexObrys);
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



