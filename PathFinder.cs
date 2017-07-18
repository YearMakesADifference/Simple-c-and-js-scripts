using UnityEngine;
using System.Collections;

public class PathFinder : MonoBehaviour 
{
	private GameObject[] Points;
	private PathMaker PM;
	private PointScr PointScript;
	private PointScr MicroPointScript;
	private bool CanFind;
	public string PointName;
	
	public int[] StartPoint;
	public int[] EndPoint;
	
	private GameObject[] SignedPoint;
	private int[] CheckingPoint = new int[2];
	
	private bool Ended;
	private int ActualPointIndex;
	
	public float StaticY;
	
	private bool GotStartPos;
	private bool ObjectsGetted;
	private bool GotWay;
	private bool PathMaked;
	
	public GameObject[] YourPath;
	private int YourPathIndex;
	private int LastSignedPoint;
	private int SignedPointIndex;
	private int[] SignedIndex;
	private bool SignedRepeat;
	private int FinderX;
	private int FinderZ;
	private int HowManySignedPoints;
	private int YourPathPoints;
	private bool Go;
	private int GoIndex;
	private Vector3 fwd;
	public float Speed;
	private bool End;
	
	IEnumerator Start()
	{
		Go = false;
		YourPathPoints = 0;
		LastSignedPoint = 0;
		YourPath = new GameObject[0];
		ActualPointIndex = 0;
		Ended = false;
		CanFind = false;
		PM = GameObject.FindWithTag("MapMaker").GetComponent<PathMaker>();
		ObjectsGetted = false;
		GotWay = false;
		PathMaked = false;
		yield return new WaitForSeconds(0.9f);
		Debug.Log("Obliczanie");
		yield return new WaitForSeconds(0.1f);
		CanFind = true;
	}
	
	void OnMouseDown(Collider Other)
	{
		if(Other.gameObject.tag == "Point")
		{
			MicroPointScript = Other.gameObject.GetComponent<PointScr>();
			EndPoint[0] = MicroPointScript.X;
			EndPoint[1] = MicroPointScript.Z;
			Debug.Log(EndPoint[0] + "x" + EndPoint[1]);
			ObjectsGetted = false;
		}
	}
	
	void Update() 
	{
		if(PM.Maked)
		{
			if(!ObjectsGetted)
			{
				End = false;
				GoIndex = 0;
				Go = false;
				YourPathPoints = 0;
				HowManySignedPoints = 0;
				SignedRepeat = false;
				FinderX = 0;
				FinderZ = 0;
				SignedPointIndex = 0;
				LastSignedPoint = 0;
				ActualPointIndex = 0;
				SignedIndex = new int[PM.SizeX * PM.SizeZ];
				SignedPoint = new GameObject[PM.SizeX * PM.SizeZ * 2];
				Points = new GameObject[PM.SizeX * PM.SizeZ];
				YourPathIndex = 0;
				YourPath = new GameObject[0];
				PathMaked = false;
				GotWay = false;
				GotStartPos = false;
				Points = GameObject.FindGameObjectsWithTag("Point");
				ObjectsGetted = true;
				for(int b1 = 0; b1 < Points.Length; b1++)
				{
					if(Points[b1].name == "Point " + StartPoint[0] + "x" + StartPoint[1])
					{
						transform.position = new Vector3(Points[b1].transform.position.x, StaticY, Points[b1].transform.position.z);
						GotStartPos = true;
					}
				}
				if(!GotStartPos)
				{
					Debug.Log("Error");
				}
			}
			if(!GotWay)
			{
				if(CanFind)
				{
					if(SignedPoint[0] == null)
					{
						YourPathPoints = 0;
						HowManySignedPoints = 0;
						LastSignedPoint = 0;
						PointScript = GameObject.Find(PointName + " " + StartPoint[0] + "x" + StartPoint[1]).GetComponent<PointScr>();
						PointScript.Index = 0;
						FinderX = StartPoint[0] + 1;
						FinderZ = StartPoint[1];
						if(GameObject.Find(PointName + " " + FinderX + "x" + FinderZ))
						{
							SignedPoint[SignedPointIndex] = GameObject.Find(PointName + " " + FinderX + "x" + FinderZ);
							SignedIndex[SignedPointIndex] = ActualPointIndex + 1;
							SignedPointIndex++;
						}
						FinderX = StartPoint[0];
						FinderZ = StartPoint[1] + 1;
						if(GameObject.Find(PointName + " " + FinderX + "x" + FinderZ))
						{
							SignedPoint[SignedPointIndex] = GameObject.Find(PointName + " " + FinderX + "x" + FinderZ);
							SignedIndex[SignedPointIndex] = ActualPointIndex + 1;
							SignedPointIndex++;
						}
						FinderX = StartPoint[0] - 1;
						FinderZ = StartPoint[1];
						if(GameObject.Find(PointName + " " + FinderX + "x" + FinderZ))
						{
							SignedPoint[SignedPointIndex] = GameObject.Find(PointName + " " + FinderX + "x" + FinderZ);
							SignedIndex[SignedPointIndex] = ActualPointIndex + 1;
							SignedPointIndex++;
						}
						FinderX = StartPoint[0];
						FinderZ = StartPoint[1] - 1;
						if(GameObject.Find(PointName + " " + FinderX + "x" + FinderZ))
						{
							SignedPoint[SignedPointIndex] = GameObject.Find(PointName + " " + FinderX + "x" + FinderZ);
							SignedIndex[SignedPointIndex] = ActualPointIndex + 1;
							SignedPointIndex++;
						}
						ActualPointIndex++;
					}
					if(SignedPoint[0] != null)
					{
						for(int x1 = 0; x1 < 999999; x1++)
						{
							for(int e1 = 0; e1 < SignedPoint.Length; e1++)
							{
								if(SignedPoint[e1] == null)
								{
									HowManySignedPoints = e1;
									e1 = SignedPoint.Length - 1;
								}
							}	
							SignedRepeat = false;
							PointScript = SignedPoint[LastSignedPoint].GetComponent<PointScr>();
							PointScript.Index = SignedIndex[LastSignedPoint];
							LastSignedPoint++;
							if(GameObject.Find(PointName + " " + (PointScript.X + 1) + "x" + PointScript.Z))
							{
								for(int d1 = 0; d1 < HowManySignedPoints; d1++)
								{
									if(SignedPoint[d1].name == GameObject.Find(PointName + " " + (PointScript.X + 1) + "x" + PointScript.Z).name || GameObject.Find(PointName + " " + (PointScript.X + 1 ) + "x" + PointScript.Z).name == PointName + " " + StartPoint[0] + "x" + StartPoint[1])
									{
										SignedRepeat = true;
									}
								}
								if(!SignedRepeat)
								{
									MicroPointScript = GameObject.Find(PointName + " " + (PointScript.X + 1) + "x" + PointScript.Z).GetComponent<PointScr>();
									if(MicroPointScript.Index == -1)
									{
										SignedPoint[SignedPointIndex] = GameObject.Find(PointName + " " + (PointScript.X + 1) + "x" + PointScript.Z);
										SignedIndex[SignedPointIndex] = PointScript.Index + 1;
										SignedPointIndex++;
									}
								}
							}
							for(int e2 = 0; e2 < SignedPoint.Length; e2++)
							{
								if(SignedPoint[e2] == null)
								{
									HowManySignedPoints = e2;
									e2 = SignedPoint.Length - 1;
								}
							}	
							SignedRepeat = false;
							if(GameObject.Find(PointName + " " + PointScript.X + "x" + (PointScript.Z + 1)))
							{
								for(int d2 = 0; d2 < HowManySignedPoints; d2++)
								{
									if(SignedPoint[d2].name == GameObject.Find(PointName + " " + PointScript.X + "x" + (PointScript.Z + 1)).name || GameObject.Find(PointName + " " + PointScript.X + "x" + (PointScript.Z + 1)).name == PointName + " " + StartPoint[0] + "x" + StartPoint[1])
									{
										SignedRepeat = true;
									}
								}
								if(!SignedRepeat)
								{
									MicroPointScript = GameObject.Find(PointName + " " + PointScript.X + "x" + (PointScript.Z + 1)).GetComponent<PointScr>();
									if(MicroPointScript.Index == -1)
									{
										SignedPoint[SignedPointIndex] = GameObject.Find(PointName + " " + PointScript.X + "x" + (PointScript.Z + 1));
										SignedIndex[SignedPointIndex] = PointScript.Index + 1;
										SignedPointIndex++;
									}
								}
							}
							for(int e3 = 0; e3 < SignedPoint.Length; e3++)
							{
								if(SignedPoint[e3] == null)
								{
									HowManySignedPoints = e3;
									e3 = SignedPoint.Length - 1;
								}
							}	
							SignedRepeat = false;
							if(GameObject.Find(PointName + " " + (PointScript.X - 1) + "x" + PointScript.Z))
							{
								for(int d3 = 0; d3 < HowManySignedPoints; d3++)
								{
									if(SignedPoint[d3].name == GameObject.Find(PointName + " " + (PointScript.X - 1) + "x" + PointScript.Z).name || GameObject.Find(PointName + " " + (PointScript.X - 1) + "x" + PointScript.Z).name == PointName + " " + StartPoint[0] + "x" + StartPoint[1])
									{
										SignedRepeat = true;
									}
								}
								if(!SignedRepeat)
								{
									MicroPointScript = GameObject.Find(PointName + " " + (PointScript.X - 1) + "x" + PointScript.Z).GetComponent<PointScr>();
									if(MicroPointScript.Index == -1)
									{
										SignedPoint[SignedPointIndex] = GameObject.Find(PointName + " " + (PointScript.X - 1) + "x" + PointScript.Z);
										SignedIndex[SignedPointIndex] = PointScript.Index + 1;
										SignedPointIndex++;
									}
								}
							}
							for(int e4 = 0; e4 < SignedPoint.Length; e4++)
							{
								if(SignedPoint[e4] == null)
								{
									HowManySignedPoints = e4;
									e4 = SignedPoint.Length - 1;
								}
							}	
							SignedRepeat = false;
							if(GameObject.Find(PointName + " " + PointScript.X + "x" + (PointScript.Z - 1)))
							{
								for(int d4 = 0; d4 < HowManySignedPoints; d4++)
								{
									if(SignedPoint[d4].name == GameObject.Find(PointName + " " + PointScript.X + "x" + (PointScript.Z - 1)).name || GameObject.Find(PointName + " " + PointScript.X + "x" + (PointScript.Z - 1)).name == PointName + " " + StartPoint[0] + "x" + StartPoint[1])
									{
										SignedRepeat = true;
									}
								}
								if(!SignedRepeat)
								{
									MicroPointScript = GameObject.Find(PointName + " " + PointScript.X + "x" + (PointScript.Z - 1)).GetComponent<PointScr>();
									if(MicroPointScript.Index == -1)
									{
										SignedPoint[SignedPointIndex] = GameObject.Find(PointName + " " + PointScript.X + "x" + (PointScript.Z - 1));
										SignedIndex[SignedPointIndex] = PointScript.Index + 1;
										SignedPointIndex++;
									}
								}
							}
							SignedRepeat = false;
							PointScript = null;
							if(SignedPoint[LastSignedPoint - 1].name == GameObject.Find(PointName + " " + EndPoint[0] + "x" + EndPoint[1]).name)
							{
								x1 = 999998;
								End = false;
								Ended = true;
								GotWay = true;
							}
						}
					}
				}
			}
			if(GotWay && !Go)
			{
				for(int c1 = 0; c1 < Points.Length; c1++)
				{
					if(YourPath.Length == 0)
					{
						if(Points[c1].name == PointName + " " + EndPoint[0] + "x" + EndPoint[1])
						{
							PointScript = Points[c1].GetComponent<PointScr>();
							YourPath = new GameObject[PointScript.Index];
							YourPathIndex = YourPath.Length;
							YourPath[YourPath.Length - 1] = GameObject.Find(PointName + " " + EndPoint[0] + "x" + EndPoint[1]);
							YourPathPoints = 1;
						}
					}
				}
				if(YourPath.Length != 0)
				{
					PointScript = YourPath[YourPath.Length - YourPathPoints].GetComponent<PointScr>();
					if(GameObject.Find(PointName + " " + (PointScript.X + 1) + "x" + PointScript.Z))
					{
						MicroPointScript = GameObject.Find(PointName + " " + (PointScript.X + 1) + "x" + PointScript.Z).GetComponent<PointScr>();
						if(PointScript.Index - 1 == MicroPointScript.Index)
						{
							YourPath[(YourPath.Length - 1) - YourPathPoints] = GameObject.Find(PointName + " " + (PointScript.X + 1) + "x" + PointScript.Z);
							YourPathPoints++;
							if(YourPath[0] != null)
							{
								Go = true;
								GoIndex = 0;
							}
						}
					}
					PointScript = YourPath[YourPath.Length - YourPathPoints].GetComponent<PointScr>();
					if(GameObject.Find(PointName + " " + PointScript.X + "x" + (PointScript.Z + 1)))
					{
						MicroPointScript = GameObject.Find(PointName + " " + PointScript.X + "x" + (PointScript.Z + 1)).GetComponent<PointScr>();
						if(PointScript.Index - 1 == MicroPointScript.Index)
						{
							YourPath[(YourPath.Length - 1) - YourPathPoints] = GameObject.Find(PointName + " " + PointScript.X + "x" + (PointScript.Z + 1));
							YourPathPoints++;
							if(YourPath[0] != null)
							{
								Go = true;
								GoIndex = 0;
							}
						}
					}
					PointScript = YourPath[YourPath.Length - YourPathPoints].GetComponent<PointScr>();
					if(GameObject.Find(PointName + " " + (PointScript.X - 1) + "x" + PointScript.Z))
					{
						MicroPointScript = GameObject.Find(PointName + " " + (PointScript.X - 1) + "x" + PointScript.Z).GetComponent<PointScr>();
						if(PointScript.Index - 1 == MicroPointScript.Index)
						{
							YourPath[(YourPath.Length - 1) - YourPathPoints] = GameObject.Find(PointName + " " + (PointScript.X - 1) + "x" + PointScript.Z);
							YourPathPoints++;
							if(YourPath[0] != null)
							{
								Go = true;
								GoIndex = 0;
							}
						}
					}
					PointScript = YourPath[YourPath.Length - YourPathPoints].GetComponent<PointScr>();
					if(GameObject.Find(PointName + " " + PointScript.X + "x" + (PointScript.Z - 1)))
					{
						MicroPointScript = GameObject.Find(PointName + " " + PointScript.X + "x" + (PointScript.Z - 1)).GetComponent<PointScr>();
						if(PointScript.Index - 1 == MicroPointScript.Index)
						{
							YourPath[(YourPath.Length - 1) - YourPathPoints] = GameObject.Find(PointName + " " + PointScript.X + "x" + (PointScript.Z - 1));
							YourPathPoints++;
							if(YourPath[0] != null)
							{
								Go = true;
								GoIndex = 0;
							}
						}
					}
				}
			}
			if(Go && !End && EndPoint[0] != 0 && EndPoint[1] != 0)
			{
				transform.LookAt(YourPath[GoIndex].transform.position);
				transform.Translate(Vector3.forward * Speed * Time.deltaTime);
				if(Vector3.Distance(transform.position, YourPath[GoIndex].transform.position) < 0.1)
				{
					if(GoIndex != YourPath.Length - 1)
					{
						GoIndex++;
					}
					else
					{
						End = true;
					}
				}
			}
		}
	}
	
	void GetPoints(int[] Coords)
	{
		EndPoint[0] = Coords[0];
		EndPoint[1] = Coords[1];
	}
}
