using UnityEngine;
using System.Collections;

public class ShootScript : MonoBehaviour 
{
	[HideInInspector] public BowSettings BS;
	[HideInInspector] public InventoryScript inv;
	[HideInInspector] public bool Preparing;
	[HideInInspector] public bool Zoom;
	[HideInInspector] public GameObject ArrowObj;
	public GameObject ArrowPrefab;
	public Camera PlayerCamera;
	public Camera LayerCam;
	public GameObject PlayerCam;
	
	public GameObject ArrowStart;
	public GameObject ArrowStep2;
	public GameObject ArrowStep3;
	public GameObject ArrowReady;
	
	[HideInInspector] public int ActualPoint;
	[HideInInspector] public float DistPoint;
	
	public float PosSpeed;
	public float RotSpeed;
	public float ErrorDist;
	
	// Scripts
	[HideInInspector] public EscapeMenu escapeMenu;
	
	
	
	void Start () 
	{
		BS = GameObject.FindWithTag("Player").GetComponent<BowSettings>();
		inv = GameObject.FindWithTag("Player").GetComponent<InventoryScript>();
		escapeMenu = GameObject.FindWithTag("Player").GetComponent<EscapeMenu>();
		Zoom = false;
		ArrowObj = null;
		ActualPoint = 0;
	}
	
	void Update () 
	{
		if(!escapeMenu.Escape && !inv.EQ)
		{
			if(!Preparing)
			{
				if(Input.GetMouseButtonDown(0))
				{
					ArrowObj = (GameObject) Instantiate(ArrowPrefab,ArrowStart.transform.position, ArrowStart.transform.rotation);
					ArrowObj.transform.parent = PlayerCam.transform;
					ActualPoint = 0;
					Preparing = true;
				}
			}
			if(Preparing)
			{
				if(Input.GetMouseButton(0))
				{
					if(ActualPoint == 0)
					{
						ArrowObj.transform.position = Vector3.Lerp(ArrowObj.transform.position, ArrowStep2.transform.position,PosSpeed);
						ArrowObj.transform.rotation = Quaternion.Lerp(ArrowObj.transform.rotation, ArrowStep2.transform.rotation, RotSpeed);
					}
					if(ActualPoint == 1)
					{
						ArrowObj.transform.position = Vector3.Lerp(ArrowObj.transform.position, ArrowStep3.transform.position,PosSpeed);
						ArrowObj.transform.rotation = Quaternion.Lerp(ArrowObj.transform.rotation, ArrowStep3.transform.rotation, RotSpeed);
					}
					if(ActualPoint == 2)
					{
						ArrowObj.transform.position = Vector3.Lerp(ArrowObj.transform.position, ArrowReady.transform.position,PosSpeed);
						ArrowObj.transform.rotation = Quaternion.Lerp(ArrowObj.transform.rotation, ArrowReady.transform.rotation, RotSpeed);
					}
				}
				if(ActualPoint == 0)
				{
					DistPoint = Vector3.Distance(ArrowObj.transform.position, ArrowStep2.transform.position);
					if(DistPoint < ErrorDist)
					{
						ActualPoint = 1;
					}
				}
				if(ActualPoint == 1)
				{
					DistPoint = Vector3.Distance(ArrowObj.transform.position, ArrowStep3.transform.position);
					if(DistPoint < ErrorDist)
					{
						ActualPoint = 2;
					}
				}
				if(ActualPoint == 2)
				{
					DistPoint = Vector3.Distance(ArrowObj.transform.position, ArrowReady.transform.position);
					if(DistPoint < ErrorDist)
					{
						ActualPoint = 3;
					}
				}
				if(ActualPoint == 3)
				{
					if(Input.GetMouseButtonUp(0))
					{
						ArrowObj.transform.parent = null;
						ArrowObj.SendMessage("Shoot",SendMessageOptions.DontRequireReceiver);
						ArrowObj = null;
						ActualPoint = 0;
						Preparing = false;
					}
				}
				if(Input.GetMouseButtonUp(0) && ActualPoint != 3)
				{
					Destroy(ArrowObj);
					ArrowObj = null;
					ActualPoint = 0;
					Preparing = false;
				}
			}
			if(Input.GetMouseButtonDown(1))
			{
				Zoom = true;
			}
			if(Input.GetMouseButtonUp(1))
			{
				Zoom = false;
			}
			if(Zoom)
			{
				PlayerCamera.fieldOfView = 40;
				LayerCam.fieldOfView = 40;
			}
			if(!Zoom)
			{
				PlayerCamera.fieldOfView = 60;
				LayerCam.fieldOfView = 60;
			}
		}
	}
}













