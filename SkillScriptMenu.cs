using UnityEngine;
using System.Collections; 

public class SkillScript : MonoBehaviour 
{
	[HideInInspector] public float[] statistics = new float[5];
	
	[TextArea] public string skillDescription;
	
	[HideInInspector] public bool skillMenu;
	public GUIStyle whiteLine;
	public GUIStyle TipStyle;
	public GUIStyle skillIconStyle;
	public GUIStyle skillBackground;
	public GUIStyle skillBookmarkBackground;
	public GUIStyle skillBookmarkStyle;
	private int skillMenuState;
	public float bookmarkSpeed;
	
	private float[] skillBookmarks = new float[3];
	
	// Zmiana poziomu menu
	private bool changingState;
	private int changingStateTo;
	private float changingStateHeight;
	//--------------------
	
	
	
	// Fading Menu
	private Color fade;
	private bool fading;
	public float fadeSpeed;
	//-----------
	
	// Fading skills
	private Color fadeSkill;
	private bool fadingSkill;
	public float fadeSpeedSkill;
	//-----------
	
	private int fors;
	
	void Start() 
	{
		fading = false;
		for(fors = 0; fors < skillBookmarks.Length; fors++)
		{
			skillBookmarks[fors] = -Screen.height;
		}
		changingStateHeight = -Screen.height;
		changingState = false;
		skillMenuState = 3;
		skillMenu = false;
	}
	
	void Update () 
	{
		if(Input.GetKeyDown("c"))
		{
			skillBackground.fontSize = Screen.width / 60;
			skillBookmarkStyle.fontSize = Screen.width / 60;
			TipStyle.fontSize = Screen.width / 60;
			if(skillMenu)
			{
				skillMenu = false;
				fading = false;
				fade = new Color(1,1,1,0);
				fadingSkill = false;
				fadeSkill = new Color(1,1,1,0);
			}
			else
			{
				fade = new Color(1,1,1,0);
				fadeSkill = new Color(1,1,1,0);
				for(fors = 0; fors < skillBookmarks.Length; fors++)
				{
					skillBookmarks[fors] = -Screen.height;
				}
				changingStateHeight = -Screen.height;
				fading = true;
				fadingSkill = false;
				skillMenu = true;
				skillMenuState = 3;
			}
		}
		if(fading)
		{
			fade.a = Mathf.Lerp(fade.a, 1, fadeSpeed);
			if(fade.a > 0.975f)
			{
				fade.a = 1;
				fading = false;
			}
		}
		if(fadingSkill)
		{
			fadeSkill.a = Mathf.Lerp(fadeSkill.a, 1, fadeSpeed);
			if(fadeSkill.a > 0.975f)
			{
				fadeSkill.a = 1;
				fadingSkill = false;
			}
		}
		
	}
	
	void OnGUI()
	{
		if(skillMenu)
		{
			GUI.color = fade;
			GUI.Box(new Rect(Screen.width * 0.4f,0,Screen.width * 0.6f,Screen.height),"",skillBackground);
			if(skillMenuState != 3)
			{
				if(GUI.Button(new Rect(Screen.width * 0.65f,Screen.height * 0.95f,Screen.width * 0.1f,Screen.height * 0.05f),"Powrót",skillBookmarkStyle))
				{
					if(!changingState && !fading)
					{
						changingState = true;
						changingStateTo = -1;
						fadeSkill = new Color(1,1,1,0);
						fadingSkill = false;
					}
				}
				GUI.Label(new Rect(Screen.width * 0.65f,Screen.height * 0.825f,Screen.width * 0.1f,Screen.height * 0.05f),"Punkty nauki : " + statistics[1].ToString("f0"),skillBackground);
			}
			if(GUI.Button(new Rect(Screen.width * 0.4f,0,Screen.width * 0.2f,Screen.height * 0.1f),"Strzelectwo",skillBookmarkStyle))
			{
				if(!changingState && !fading)
				{
					changingState = true;
					fadeSkill = new Color(1,1,1,0);
					fadingSkill = false;
					changingStateTo = 0;
				}
			}
			if(GUI.Button(new Rect(Screen.width * 0.6f,0,Screen.width * 0.2f,Screen.height * 0.1f),"Łuczarstwo",skillBookmarkStyle))
			{
				if(!changingState && !fading)
				{
					changingState = true;
					fadeSkill = new Color(1,1,1,0);
					fadingSkill = false;
					changingStateTo = 1;
				}
			}
			if(GUI.Button(new Rect(Screen.width * 0.8f,0,Screen.width * 0.2f,Screen.height * 0.1f),"Skradanie",skillBookmarkStyle))
			{
				if(!changingState && !fading)
				{
					changingState = true;
					fadeSkill = new Color(1,1,1,0);
					fadingSkill = false;
					changingStateTo = 2;
				}
			}
			for(fors = 0; fors < skillBookmarks.Length; fors++)
			{
				GUI.Label(new Rect(Screen.width * 0.4f,skillBookmarks[fors],Screen.width * 0.6f,Screen.height),"",skillBookmarkBackground);
			}
			if(changingState && !fading)
			{
				if(changingStateTo != -1)
				{
					for(fors = 0; fors < skillBookmarks.Length; fors++)
					{
						if(fors != changingStateTo)
						{
							skillBookmarks[fors] = -Screen.height;
						}
						skillMenuState = 0;
					}
					skillBookmarks[changingStateTo] = changingStateHeight;
					changingStateHeight = Mathf.Lerp(changingStateHeight, 0, bookmarkSpeed);
					if(skillBookmarks[changingStateTo] > -Screen.height * 0.05f)
					{
						skillMenuState = changingStateTo;
						changingState = false;
						fadingSkill = true;
						changingStateHeight = -Screen.height;
					}
				}
				else
				{
					skillMenuState = 3;
					for(fors = 0; fors < skillBookmarks.Length; fors++)
					{
						skillBookmarks[fors] = -Screen.height;
					}
					changingStateTo = 0;
					changingState = false;
					fadingSkill = false;
					fadeSkill = new Color(1,1,1,0);
				}
			}
			if(skillMenuState == 3)
			{
				GUI.Label(new Rect(Screen.width * 0.5f,Screen.height * 0.3f,Screen.width * 0.2f,Screen.height * 0.1f),"Poziom : " + statistics[0].ToString("f0"),skillBackground);
				GUI.Label(new Rect(Screen.width * 0.5f,Screen.height * 0.4f,Screen.width * 0.2f,Screen.height * 0.1f),"Punkty nauki : " + statistics[1].ToString("f0"),skillBackground);
				GUI.Label(new Rect(Screen.width * 0.5f,Screen.height * 0.5f,Screen.width * 0.2f,Screen.height * 0.1f),"EXP : " + statistics[2].ToString("f0") + " / " + statistics[3].ToString("f0"),skillBackground);
				GUI.Label(new Rect(Screen.width * 0.5f,Screen.height * 0.6f,Screen.width * 0.2f,Screen.height * 0.1f),"Czas : " + statistics[4].ToString("f0"),skillBackground);
				GUI.Label(new Rect(Screen.width * 0.5f,Screen.height * 0.7f,Screen.width * 0.2f,Screen.height * 0.1f),"Czas gry : 00:00:00",skillBackground);
			}
			GUI.color = fadeSkill;
			if(skillMenuState == 0)
			{
				GUI.Label(new Rect(Screen.width * 0.675f,Screen.height * 0.7f,Screen.width * 0.05f,Screen.width * 0.05f),new GUIContent("", skillDescription), skillIconStyle);
				GUI.Label(new Rect(Screen.width * 0.675f,Screen.height * 0.55f,Screen.width * 0.05f,Screen.width  * 0.05f),new GUIContent("", skillDescription), skillIconStyle);
				GUI.Label(new Rect(Screen.width * 0.55f,Screen.height * 0.5f,Screen.width * 0.05f,Screen.width  * 0.05f),new GUIContent("", skillDescription), skillIconStyle);
				GUI.Label(new Rect(Screen.width * 0.75f,Screen.height * 0.5f,Screen.width * 0.05f,Screen.width  * 0.05f),new GUIContent("", skillDescription), skillIconStyle);
				GUI.Label(new Rect(Screen.width * 0.825f,Screen.height * 0.35f,Screen.width * 0.05f,Screen.width  * 0.05f),new GUIContent("", skillDescription), skillIconStyle);
				GUI.Label(new Rect(Screen.width * 0.75f,Screen.height * 0.2f,Screen.width * 0.05f,Screen.width  * 0.05f),new GUIContent("", skillDescription), skillIconStyle);
				GUI.Label(new Rect(Screen.width * 0.675f,Screen.height * 0.15f,Screen.width * 0.05f,Screen.width  * 0.05f),new GUIContent("", skillDescription), skillIconStyle);
			}
			if(skillMenuState == 1)
			{
				GUI.Label(new Rect(Screen.width * 0.675f,Screen.height * 0.7f,Screen.width * 0.05f,Screen.width * 0.05f),new GUIContent("", skillDescription), skillIconStyle);
				GUI.Label(new Rect(Screen.width * 0.675f,Screen.height * 0.55f,Screen.width * 0.05f,Screen.width  * 0.05f),new GUIContent("", skillDescription), skillIconStyle);
				GUI.Label(new Rect(Screen.width * 0.55f,Screen.height * 0.5f,Screen.width * 0.05f,Screen.width  * 0.05f),new GUIContent("", skillDescription), skillIconStyle);
				GUI.Label(new Rect(Screen.width * 0.75f,Screen.height * 0.5f,Screen.width * 0.05f,Screen.width  * 0.05f),new GUIContent("", skillDescription), skillIconStyle);
				GUI.Label(new Rect(Screen.width * 0.825f,Screen.height * 0.35f,Screen.width * 0.05f,Screen.width  * 0.05f),new GUIContent("", skillDescription), skillIconStyle);
				GUI.Label(new Rect(Screen.width * 0.75f,Screen.height * 0.2f,Screen.width * 0.05f,Screen.width  * 0.05f),new GUIContent("", skillDescription), skillIconStyle);
				GUI.Label(new Rect(Screen.width * 0.675f,Screen.height * 0.15f,Screen.width * 0.05f,Screen.width  * 0.05f),new GUIContent("", skillDescription), skillIconStyle);
			}
			if(skillMenuState == 2)
			{
				GUI.Label(new Rect(Screen.width * 0.675f,Screen.height * 0.7f,Screen.width * 0.05f,Screen.width * 0.05f),new GUIContent("", skillDescription), skillIconStyle);
				GUI.Label(new Rect(Screen.width * 0.675f,Screen.height * 0.55f,Screen.width * 0.05f,Screen.width  * 0.05f),new GUIContent("", skillDescription), skillIconStyle);
				GUI.Label(new Rect(Screen.width * 0.55f,Screen.height * 0.5f,Screen.width * 0.05f,Screen.width  * 0.05f),new GUIContent("", skillDescription), skillIconStyle);
				GUI.Label(new Rect(Screen.width * 0.75f,Screen.height * 0.5f,Screen.width * 0.05f,Screen.width  * 0.05f),new GUIContent("", skillDescription), skillIconStyle);
				GUI.Label(new Rect(Screen.width * 0.825f,Screen.height * 0.35f,Screen.width * 0.05f,Screen.width  * 0.05f),new GUIContent("", skillDescription), skillIconStyle);
				GUI.Label(new Rect(Screen.width * 0.75f,Screen.height * 0.2f,Screen.width * 0.05f,Screen.width  * 0.05f),new GUIContent("", skillDescription), skillIconStyle);
				GUI.Label(new Rect(Screen.width * 0.675f,Screen.height * 0.15f,Screen.width * 0.05f,Screen.width  * 0.05f),new GUIContent("", skillDescription), skillIconStyle);
			}
			if(GUI.tooltip != "" && fadeSkill.a > 0.5f)
			{
				GUI.color = fade;
				GUI.Label(new Rect(Input.mousePosition.x, (Input.mousePosition.y * -1 + Screen.height), Screen.width * 0.15f, Screen.width * 0.15f),GUI.tooltip,TipStyle);
			}
		}
	}
}
