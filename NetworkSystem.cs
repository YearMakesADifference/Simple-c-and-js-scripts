using UnityEngine;
using System.Collections;
using UnityEngine.Networking;
using UnityEngine.Networking.Types;
using UnityEngine.Networking.Match;
using System.Collections.Generic;

public class NetworkSystem : NetworkBehaviour 
{
	private string RoomName;
	private string PlayerName;
	private string RoomPass;
	private NetworkMatch networkMatch;
	private NetworkManager networkManager;
	public GUIStyle Styl;
	private bool Maked; 
	List<MatchDesc> matchList = new List<MatchDesc>();
	private int Menu; 
	/* 
	0 - main
	1 - host
	2 - client
	3 - lobby
	-1 - OCZEKIWANIE
	-2 - BRAK MENU
	*/
	
	void Awake()
	{
		Maked = false;
		networkManager = GameObject.FindWithTag("NM").GetComponent<NetworkManager>();
	}
	
	void Start () 
	{
		Menu = 0;
		RoomName = "Room name";
		PlayerName = "Player name";
		RoomPass = "Password";
	}
	
	void OnGUI()
	{
		if(Menu == -1)
		{
			GUI.Label(new Rect(Screen.width * 0.45f, Screen.height * 0.45f,Screen.width * 0.1f,Screen.height * 0.1f),"Wait..." ,Styl);
		}
		if(Menu == 0)
		{
			networkManager.StopMatchMaker();
			GUI.Box(new Rect(Screen.width * 0.35f, Screen.height * 0.35f,Screen.width * 0.3f,Screen.height * 0.3f),"Type : " );
			if(GUI.Button(new Rect(Screen.width * 0.35f, Screen.height * 0.4f,Screen.width * 0.3f,Screen.height * 0.15f),"Host game"))
			{
				Menu = 1;
			}
			if(GUI.Button(new Rect(Screen.width * 0.35f, Screen.height * 0.575f,Screen.width * 0.3f,Screen.height * 0.15f),"Connect"))
			{
				Menu = 2;
			}
		}
		if(Menu == 1)
		{
			if(GUI.Button(new Rect(Screen.width * 0.4f, Screen.height * 0.2f,Screen.width * 0.2f,Screen.height * 0.09f),"Back"))
			{
					Menu = 0;
			}
			RoomName = GUI.TextField(new Rect(Screen.width * 0.4f, Screen.height * 0.3f,Screen.width * 0.2f,Screen.height * 0.09f), RoomName, 15);
			PlayerName = GUI.TextField(new Rect(Screen.width * 0.4f, Screen.height * 0.4f,Screen.width * 0.2f,Screen.height * 0.09f), PlayerName, 15);
			RoomPass = GUI.TextField(new Rect(Screen.width * 0.4f, Screen.height * 0.5f,Screen.width * 0.2f,Screen.height * 0.09f), RoomPass, 15);
			if(RoomName.Length > 4 && RoomName != "Room name" && PlayerName.Length > 4 && PlayerName != "Player name" && RoomPass != "Password")
			{
				networkManager.StartMatchMaker();
				if(GUI.Button(new Rect(Screen.width * 0.4f, Screen.height * 0.6f,Screen.width * 0.2f,Screen.height * 0.09f),"Host game"))
				{
					networkManager.matchMaker.CreateMatch(RoomName, networkManager.matchSize, true, RoomPass, networkManager.OnMatchCreate);
					Menu = -2;
				}
			}
		}
		if(Menu == 2)
		{
			if(GUI.Button(new Rect(Screen.width * 0.4f, Screen.height * 0.1f,Screen.width * 0.2f,Screen.height * 0.09f),"Back"))
			{
					Menu = 0;
			}
			PlayerName = GUI.TextField(new Rect(Screen.width * 0.4f, Screen.height * 0.2f,Screen.width * 0.2f,Screen.height * 0.09f), PlayerName, 15);
			RoomPass = GUI.TextField(new Rect(Screen.width * 0.4f, Screen.height * 0.3f,Screen.width * 0.2f,Screen.height * 0.09f), RoomPass, 15);
			if(PlayerName.Length > 4 && PlayerName != "Player name" && RoomPass != "Password")
			{
				networkManager.StartMatchMaker();
				networkManager.matchMaker.ListMatches(0, 20, "", networkManager.OnMatchList);
				if(networkManager.matches != null)
				{
					if(networkManager.matches.Count > 0)
					{
						for(int a = 0; a < networkManager.matches.Count; a++)
						{
							if (GUI.Button(new Rect(Screen.width * 0.425f,Screen.height * 0.4f + (Screen.height * (0.05f * a)),Screen.width * 0.15f,Screen.height * 0.05f),networkManager.matches[a].name))
							{
								networkManager.matchMaker.JoinMatch(networkManager.matches[a].networkId, RoomPass, networkManager.OnMatchJoined);
								Menu = -2;
							}
						}
					}
				}
			}
		}
		if(Menu == -2)
		{
			GUI.Label(new Rect(15,15,2000,2000),"Connected players : " + Network.connections.Length);
		}
	}	
}
			
			
			
			
			
			
			
			
			
			
			
