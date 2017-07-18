using UnityEngine;
using System.Collections;

public class PathMaker : MonoBehaviour 
{
	public GameObject[] Points;
	private GameObject StartPoint;
	private PointScr PointScript;
	// Min i Max włącznie
	public int SizeX;
	public int SizeZ;
	private GameObject Point;
	private int Index;
	private int PosX;
	private int PosZ;
	public GameObject PointPrefab;
	public int[] ZoneWithoutPointX;
	public int[] ZoneWithoutPointZ;
	public bool Maked;
	private int Destroyed;
	
	void Awake()
	{
		Maked = false;
	}
	
	void Start() 
	{
		if(ZoneWithoutPointX.Length != ZoneWithoutPointZ.Length)
		{
			Debug.Log("Error");
		}
		Index = 0;
		Points = new GameObject[SizeX * SizeZ];
		MakePoints();
	}
	
	void MakePoints()
	{
		for(int x = 0; x < SizeX; x++)
		{
			for(int z = 0; z < SizeZ; z++)
			{
				PosX = -(SizeX / 2) + x;
				PosZ = -(SizeZ / 2) + z;
				Point = (GameObject) Instantiate(PointPrefab, new Vector3(PosX, 0, PosZ), Quaternion.identity);
				Point.transform.parent = GameObject.FindWithTag("Points").transform;
				Point.gameObject.name = "Point " + (x + 1) + "x" + (z + 1);
				PointScript = Point.GetComponent<PointScr>();
				PointScript.X = x + 1;
				PointScript.Z = z + 1;
				PointScript = null;
				Points[Index] = Point;
				Point = null;
				Index++;
				if(x == SizeX -1 && z == SizeZ -1)
				{
					DeletePoints();
				}
			}
		}
	}
	
	void DeletePoints()
	{
		Destroyed = 0;
		for(int a1 = 0; a1 < Points.Length; a1++)
		{
			for(int a2 = 0; a2 < ZoneWithoutPointX.Length; a2++)
			{
				if(Points[a1].name == "Point " + ZoneWithoutPointX[a2] + "x" + ZoneWithoutPointZ[a2])
				{
					Destroy(GameObject.Find("Point " + ZoneWithoutPointX[a2] + "x" + ZoneWithoutPointZ[a2]));
					Destroyed++;
				}
			}
		}
	}
	
	void Update()
	{
		if(!Maked)
		{
			if(Destroyed == ZoneWithoutPointX.Length)
			{
				Maked = true;
			}
		}
	}
}
