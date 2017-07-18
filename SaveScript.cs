using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using System.Xml;
using System.IO;
using System.Text;

public class Maker : MonoBehaviour 
{
	[HideInInspector]public string MakeData1;
	[HideInInspector]public string MakeData2;
	[HideInInspector]public string LoadedData1;
	[HideInInspector]public string LoadedData2;
	[HideInInspector]public bool Making;
	[HideInInspector]public Maker mk;
	
	void Start()
	{
		Making = false;
		mk = this.GetComponent<Maker>();
	}
	
	void OnGUI() 
	{
		if(!Making)
		{
			if(GUI.Button(new Rect(350,180,300,50),"Load"))
			{
				mk.Load();
			}
			if(GUI.Button(new Rect(20,100,300,50),"Make new"))
			{
				Making = true;
			}
		}
		if(Making)
		{
			MakeData1 = GUI.TextField(new Rect(20, 20, 300, 50), MakeData1, 10);
			MakeData2 = GUI.TextField(new Rect(20,100,300,50), MakeData2, 10);
			if(MakeData1 != "" && MakeData2 != "")
			{
				if(GUI.Button(new Rect(20,180,300,50),"Make"))
				{
					mk.Save();
				}
			}
		}
	}
	void Save()
	{
		string filepath = Application.dataPath + "/Resources/PlayerXML.xml";
		XmlDocument xmlDoc = new XmlDocument();
		if(File.Exists(filepath))
		{
			xmlDoc.Load(filepath);
			XmlElement elmRoot = xmlDoc.DocumentElement;
			XmlElement DataElement = xmlDoc.CreateElement("PlayerData");
			elmRoot.RemoveAll();
			XmlElement health = xmlDoc.CreateElement("Health");
			health.InnerText = MakeData1;
			XmlElement level = xmlDoc.CreateElement("Level");
			level.InnerText = MakeData2;
			DataElement.AppendChild(health);
			DataElement.AppendChild(level);
			elmRoot.AppendChild(DataElement);
			xmlDoc.Save(filepath);
		}
	}
	void Load()
	{
		string filepath = Application.dataPath + "/Resources/PlayerXML.xml";
		XmlDocument xmlDoc = new XmlDocument();
		if(File.Exists(filepath))
		{
			xmlDoc.Load(filepath);
			XmlNodeList transformList = xmlDoc.GetElementsByTagName("PlayerData");
			foreach (XmlNode transformInfo in transformList)
			{
				XmlNodeList transformcontent = transformInfo.ChildNodes;
				foreach (XmlNode transformItens in transformcontent)
				{
					if(transformItens.Name == "Health")
					{
						MakeData1 = transformItens.InnerText;
					}
					if(transformItens.Name == "Level")
					{
						MakeData2 = transformItens.InnerText;
					}
				}
			}
		}
	}
}